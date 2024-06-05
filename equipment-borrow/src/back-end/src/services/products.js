const db = require('./db');

/**
 * Retrieves all products from the database.
 *
 * @returns {Promise<Array<{id: number, name: string, description: string, imageUrl: string, quantityAvailable: number, unitPrice: number}>>} A promise that resolves to an array of user objects.
 */async function getAll() {
  const products = await db.query(
    "SELECT * FROM Product",
  );

  return products;
}

module.exports = { getAll }
