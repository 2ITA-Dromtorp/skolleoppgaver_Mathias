import axios from "axios";

/**
 * Retrieves all feedbacks from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of feedbacks.
 * @throws {Error} If the request to the server fails.
 */
export async function getAll() {
  try {
    const response = await axios.get("/v1/feedback/");
    return response.data;
  } catch (error) {
    console.error("Get feedbacks failed", error);
    throw error;
  }
}

export default { getAll };

