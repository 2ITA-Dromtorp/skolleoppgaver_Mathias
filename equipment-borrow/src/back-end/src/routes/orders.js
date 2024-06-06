const express = require("express");
const orderService = require("../services/orders");
const { ensureAuthenticated } = require("../middleware/api-access-validation");

const router = express.Router();

/**
 * Route for creating a new order.
 */
router.post("/", ensureAuthenticated(), async (req, res, next) => {
  try {
    // TODO: Validate body (using joi.dev or similar)

    const orderData = req.body;
    const orderLinesData = req.body?.orderLines ?? [];

    // Validate that we have data and if orderLines provided ensure that it is a list of order lines
    if (orderData == null || (orderLinesData != null && !Array.isArray(orderLinesData))) {
      return res.status(400).send("Missing order data or orderLines is not an array of order lines");
    }

    // Only admin can create orders on behalf of others
    if (req["auth"].userRole !== "admin" && orderData.customerId !== req["auth"].id) {
      return res.status(400).send("Customer id does not match logged in user.");
    }

    console.info(`Create order.`, orderData, orderLinesData);
    const order = await orderService.createOrder(orderData);
    const orderLines = [];

    // Loop all orderLines (if any) and add them to DB
    for (const orderLine of orderLinesData) {
      const newOrderLine = await orderService.addOrderLine(order.id, orderLine);
      orderLines.push(newOrderLine);
    }

    res.status(200).json({ order, orderLines });
  } catch (error) {
    next(error);
  }
});

/**
 * Route for updating an order based on ID.
 */
router.put("/:id([0-9]+)", ensureAuthenticated(), async (req, res, next) => {
  try {
    // TODO: Validate body (using joi.dev or similar)

    const orderData = req.body;
    if (orderData == null || req.params.id !== orderData.id) {
      return res.status(400).send("Missing order data or mismatch between order id and request path");
    }

    // Only admin can update orders on behalf of others
    if (req["auth"].userRole !== "admin" && orderData.customerId !== req["auth"].id) {
      return res.status(400).send("Customer id does not match logged in user.");
    }

    console.info(`Update order ${orderData.id}.`, orderData);
    const order = await orderService.updateOrder(orderData);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

/**
 * Route for deleting an order based on ID.
 */
router.delete("/:id([0-9]+)", ensureAuthenticated(), async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const order = await orderService.getOrderById(orderId);

    // Only admin can delete orders on behalf of others
    if (req["auth"].userRole !== "admin" && order.customerId !== req["auth"].id) {
      return res.status(400).send("Customer id does not match logged in user.");
    }

    console.info(`Delete order by id '${req.params.id}'`);
    const orderWasDeleted = await orderService.deleteOrder(orderId);
    if (orderWasDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
