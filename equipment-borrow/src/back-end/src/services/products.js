const db = require('./db');

/**
 * Retrieves all products from the database.
 *
 * @returns {Promise<Array<{id: number, name: string, description: string, imageUrl: string, unitPrice: number, quantityAvailable: number}>>} A promise that resolves to an array of product objects.
 */
async function getAllProducts() {
  const products = await db.query(
    "SELECT * FROM Product",
  );

  return products;
}


module.exports = { getAllProducts }
