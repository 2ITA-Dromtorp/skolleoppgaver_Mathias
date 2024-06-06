import axios from "axios";

/**
 * Array of valid user roles.
 *
 * @type {Array<{ value: string, label: string }>}
 */
export const validUserRoles = [
  { value: "user", label: "Bruker" },
  { value: "admin", label: "Administrator" },
];

/**
 * Array of valid user types.
 *
 * @type {Array<{ value: string, label: string }>}
 */
export const validUserTypes = [
  { value: "kunde", label: "Kunde" },
  { value: "ansatt", label: "Ansatt" },
]

/**
 * Retrieves all users from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {Error} If the request to the server fails.
 */
export async function getAll() {
  try {
    const response = await axios.get("/v1/users/");
    return response.data;
  } catch (error) {
    console.error("Get users failed", error);
    throw error;
  }
}

/**
 * Creates a new user.
 *
 * @param {Object} user - The user object to be created.
 * @returns {Promise<Object>} - A promise that resolves to the created user data.
 * @throws {Error} - If the user creation fails.
 */
export async function create(user) {
  try {
    const response = await axios.post(`/v1/users/`, user);
    return response.data;
  } catch (error) {
    console.error("Create user failed", error);
    throw error;
  }
}

/**
 * Updates a user.
 *
 * @param {Object} user - The user object to be updated.
 * @returns {Promise<Object>} - A promise that resolves to the updated user data.
 * @throws {Error} - If the update operation fails.
 */
export async function update(user) {
  try {
    const response = await axios.put(`/v1/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Update user failed", error);
    throw error;
  }
}

/**
 * Deletes a user by ID.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - If deleting the user fails.
 */
export async function deleteById(id) {
  try {
    const response = await axios.delete(`/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Deleting user failed", error);
    throw error;
  }
}

export default { getAll, create, update, deleteById, validUserRoles, validUserTypes };
