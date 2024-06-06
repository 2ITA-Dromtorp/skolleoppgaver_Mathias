const db = require('./db');

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array<{id: number, password: string, firstName: string, lastName: string, username: string, company: string, userType: string, userRole: string}>>} A promise that resolves to an array of user objects.
 */async function getAllUsers() {
  const users = await db.query(
    "SELECT * FROM User",
  );

  return users;
}

/**
 * Retrieves a user by their ID.
 *
 * @param {number} id - The ID of the user.
 * @returns {Promise<{id: number, password: string, firstName: string, lastName: string, username: string, company: string, userType: string, userRole: string}>} A promise that resolves to the user object.
 */
async function getUserById(id) {
  const user = await db.querySingleRow(
    "SELECT * FROM User WHERE id = ?",
    [id]
  );

  return user;
}

/**
 * Retrieves a user by their username.
 *
 * @param {string} username - The username of the user.
 * @returns {Promise<{id: number, password: string, firstName: string, lastName: string, username: string, company: string, userType: string, userRole: string}>} A promise that resolves to the user object.
 */
async function getUserByUsername(username) {
  const user = await db.querySingleRow(
    "SELECT * FROM User WHERE username = ?",
    [username]
  );

  return user;
}

/**
 * Deletes a user from the database.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the user was successfully deleted, false otherwise.
 */
async function deleteUser(id) {
  const result = await db.query(
    "DELETE FROM User WHERE id = ?",
    [id]
  );

  return result.affectedRows === 1;
}

/**
 * Creates a new user in the database.
 * @param {Object} user - The user object containing the user details.
 * @param {string} user.username - The username of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.company - The company user is employed at
 * @param {string} user.userType - The type of the user.
 * @param {string} user.userRole - The role of the user.
 * @returns {Promise<{id: number, password: string, firstName: string, lastName: string, username: string, company: string, userType: string, userRole: string}>} - A promise that resolves to the created user object.
 * @throws {Error} - If a user with the same username already exists or if the user creation fails.
 */
async function createUser(user) {
  const { username, password, firstName, lastName, company, userType, userRole } = user;

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return null;
    //throw new Error(`User with username '${username}' already exists`);
  }

  const result = await db.query(
    "INSERT INTO User (username, password, firstName, lastName, company, userType, userRole) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [username, password, firstName, lastName, company, userType, userRole]
  );

  if (result.affectedRows === 1) {
    return getUserById(result.insertId);
  }

  throw new Error('Failed to create user');
}

/**
 * Updates a user in the database.
 * @param {Object} user - The user object containing the user details.
 * @param {number} user.id - The id of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.company - The company user is employed at
 * @param {string} user.userType - The type of the user.
 * @param {string} user.userRole - The role of the user.
 * @returns {Promise<{id: number, password: string, firstName: string, lastName: string, username: string, company: string, userType: string, userRole: string}>} - A promise that resolves to the created user object.
 * @throws {Error} - If the user update fails.
 */
async function updateUser(user) {
  const { id, password, firstName, lastName, company, userType, userRole } = user;

  const result = await db.query(
    "UPDATE User SET password = ?, firstName = ?, lastName = ?, company = ?, userType = ?, userRole = ? WHERE id = ?",
    [password, firstName, lastName, company, userType, userRole, id]
  );

  if (result.affectedRows === 1) {
    return getUserById(id);
  }

  throw new Error('Failed to create user');
}

module.exports = { getAllUsers, getUserByUsername, getUserById, deleteUser, createUser, updateUser }
