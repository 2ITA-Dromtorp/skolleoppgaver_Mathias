const db = require('./db');

/**
 * Retrieves an order by ID.
 *
 * @param {number} id - The ID of the order.
 * @returns {Promise<{id: number, customerId: number, address: string, status: string}>} A promise that resolves to the order object.
 */
async function getOrderById(id) {
  const order = await db.querySingleRow(
    "SELECT * FROM `Order` WHERE id = ?",
    [id]
  );

  return order;
}

/**
 * Retrieves all order lines with product info for an order ID.
 *
 * @param {number} orderId - The ID of the order.
 * @returns {Promise<{id: number, quantity: number, productId: number, unitPrice: number, productName: string, productDescription: string}[]>} A promise that resolves to an array of order line objects.
 */
async function getOrderLines(orderId) {
  const orderLines = await db.query(`
    SELECT
      ol.id,
      ol.quantityId,
      ol.productId,
      ol.unitPrice,
      p.name as productName,
      p.description as productDescription
    FROM
      OrderLine as ol
    INNER JOIN
      Product as p ON p.id = ol.productId
    WHERE
      ol.orderId = ?`,
    [orderId]
  );

  return orderLines;
}

/**
 * Retrieves an order line by ID.
 *
 * @param {number} id - The ID of the order line.
 * @returns {Promise<{id: number, orderId: number, productId: number, quantity: number, unitPrice: number}>} A promise that resolves to the order line object.
 */
async function getOrderLineById(id) {
  const orderLine = await db.querySingleRow(
    "SELECT * FROM OrderLine WHERE id = ?",
    [id]
  );

  return orderLine;
}

/**
 * Add a new order line to an order in the database.
 * @param {number} orderId - The order id to add the order line to .
 * @param {Object} orderLine - The order line object.
 * @param {number} orderLine.productId - The id of the product (product.id).
 * @param {string} orderLine.quantity - The number of units to purchase.
 * @param {number} orderLine.unitPrice - The price per unit.
 * @returns {Promise<{id: number, orderId: number, productId: number, quantity: number, unitPrice: number}>} - A promise that resolves to the added order line object.
 * @throws {Error} - If the order line creation fails.
 */
async function addOrderLine(orderId, orderLine) {
  const { productId, quantity, unitPrice } = orderLine;

  const result = await db.query(
    "INSERT INTO OrderLine (orderId, productId, quantity, unitPrice) VALUES (?, ?, ?, ?)",
    [orderId, productId, quantity, unitPrice]
  );

  // Update product availability
  // TODO: Insert and Update in a transaction so we can rollback if one fails
  await db.query(
    "UPDATE Product SET quantityAvailable = quantityAvailable - ? WHERE id = ?",
    [quantity, productId]
  );

  if (result.affectedRows === 1) {
    return getOrderLineById(result.insertId);
  }

  throw new Error('Failed to create order line');
}

/**
 * Creates a new order in the database.
 * @param {Object} order - The order object containing the order details.
 * @param {number} order.customerId - The id of the customer (user.id).
 * @param {string} order.address - The shipping address.
 * @param {string} order.status - The order status (new, shipped, delivered).
 * @returns {Promise<{id: number, customerId: number, address: string, status: string}>} - A promise that resolves to the created order object.
 * @throws {Error} - If the order creation fails.
 */
async function createOrder(order) {
  const { customerId, address, status } = order;

  const result = await db.query(
    "INSERT INTO `Order` (customerId, address, status) VALUES (?, ?, ?)",
    [customerId, address, status]
  );

  if (result.affectedRows === 1) {
    return getOrderById(result.insertId);
  }

  throw new Error('Failed to create order');
}

/**
 * Update am order in the database.
 * @param {Object} order - The order object containing the order details.
 * @param {number} order.id - The id of the order.
 * @param {number} order.customerId - The id of the customer (user.id).
 * @param {string} order.address - The shipping address.
 * @param {string} order.status - The order status (new, shipped, delivered).
 * @returns {Promise<{id: number, customerId: number, address: string, status: string}>} - A promise that resolves to the updated order object.
 * @throws {Error} - If the order update fails.
 */
async function updateOrder(order) {
  const { id, customerId, address, status } = order;

  const result = await db.query(
    "UPDATE `Order` SET customerId = ?, address = ?, status = ? WHERE id = ?",
    [customerId, address, status, id]
  );

  if (result.affectedRows === 1) {
    return getOrderById(result.insertId);
  }

  throw new Error('Failed to update order');
}

/**
 * Deletes an order from the database.
 *
 * @param {number} id - The ID of the order to delete.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the order was successfully deleted, false otherwise.
 */
async function deleteOrder(id) {
  const result = await db.query(
    "DELETE FROM `Order` WHERE id = ?",
    [id]
  );

  return result.affectedRows === 1;
}


module.exports = { getOrderById, createOrder, updateOrder, deleteOrder, getOrderLines, getOrderLineById, addOrderLine }
