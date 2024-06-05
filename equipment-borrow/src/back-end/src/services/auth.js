const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/**
 * Hashes the given password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
async function hashPassword(password) {
  const result = await bcrypt.hash(password, config.auth.saltRounds);
  return result;
}

/**
 * Creates a JWT token for the given user.
 *
 * @param {Object} user - The user object.
 * @returns {string} The JWT token.
 */
function createJwtToken(user) {
  // @ts-ignore
  const token = jwt.sign(user, config.auth.jwtSecret, {
    expiresIn: config.auth.tokenExpiration,
    algorithm: config.auth.signatureAlgorithm
  });

  return token;
}

/**
 * Decodes a JWT token and returns the decoded payload.
 *
 * @param {string} token - The JWT token to decode.
 * @returns {import('jsonwebtoken').JwtPayload} - The decoded payload.
 */
function decodeJwtToken(token) {
  const decoded = jwt.decode(token);
  if (typeof decoded === "string") {
    return null;
  }

  return decoded;
}

/**
 * Validates the provided credentials.
 *
 * @param {string} inputPassword - The password provided by the user.
 * @param {string} storedHash - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the credentials are valid and false otherwise.
 */
async function validateCredentials(inputPassword, storedHash) {
  const isValid = await bcrypt.compare(inputPassword, storedHash);
  return isValid;
}

module.exports = { hashPassword, validateCredentials, createJwtToken, decodeJwtToken }
