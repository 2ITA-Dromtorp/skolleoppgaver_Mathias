const express = require("express");
const productService = require("../services/products");
const { ensureAuthenticated } = require("../middleware/api-access-validation");

const router = express.Router();

/**
 * Route for getting list of all products.
 */
router.get("/", ensureAuthenticated(), async (req, res, next) => {
  try {
      // Get All
      console.info(`Get all products`);
      const products = await productService.getAll();
      res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
