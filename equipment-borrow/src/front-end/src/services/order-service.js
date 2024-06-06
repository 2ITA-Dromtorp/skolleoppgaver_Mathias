import axios from "axios";

/**
 * Creates a new order in the database.
 * @param {Object} order - The order object containing the order details.
 * @param {number} order.customerId - The id of the customer (user.id).
 * @param {string} order.address - The shipping address.
 * @param {string} order.status - The order status (new, shipped, delivered).
 * @param {Object[]} order.orderLines - The order line object.
 * @param {number} order.orderLines[].productId - The id of the product (product.id).
 * @param {string} order.orderLines[].quantity - The number of units to purchase.
 * @param {number} order.orderLines[].unitPrice - The price per unit.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 * @throws {Error} If the request to the server fails.
 */
export async function createOrder(order) {
  try {
    const response = await axios.post("/v1/orders/", order);
    return response.data;
  } catch (error) {
    console.error("Create order failed", error);
    throw error;
  }
}

export default { createOrder };
