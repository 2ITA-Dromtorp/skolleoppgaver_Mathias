const orderService = require("../services/orders");

/**
 * Removes the password property from the user object.
 *
 * @param {Object} user - The user object.
 * @returns {Object} - The user object without the password property.
 */
const removePasswordsFromUser = (user) => {
  delete user.password;
  return user;
};

/**
 * Removes passwords from an array of user objects.
 *
 * @param {Array} users - The array of user objects.
 * @returns {Array} - The updated array of user objects with passwords removed.
 */
const removePasswordsFromUserArray = (users) => users.map(removePasswordsFromUser);

module.exports = { removePasswordsFromUser, removePasswordsFromUserArray }
