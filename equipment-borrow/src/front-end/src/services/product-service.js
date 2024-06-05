import axios from "axios";
/**
 * Retrieves all products.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 * @throws {Error} If the request to the server fails.
 */
export async function getAll() {
  try {
    const response = await axios.get("/v1/products/");
    return response.data;
  } catch (error) {
    console.error("Get products failed", error);
    throw error;
  }
}

export default { getAll };
