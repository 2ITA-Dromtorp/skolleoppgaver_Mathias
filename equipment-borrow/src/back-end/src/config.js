/**
 * Configuration object for the application.
 *
 * @typedef {Object} Config
 * @property {Object} db - Database configuration.
 * @property {string} db.host - The host of the database.
 * @property {string} db.user - The username for the database connection.
 * @property {string} db.password - The password for the database connection.
 * @property {string} db.database - The name of the database.
 * @property {number} db.connectionTimeout - The timeout for the database connection in seconds.
 * @property {Object} server - Server configuration.
 * @property {number} server.port - The port on which the server should listen.
 * @property {Object} auth - Authentication configuration.
 * @property {number} auth.saltRounds - The number of salt rounds for password hashing.
 * @property {string} auth.tokenExpiration - The expiration time for authentication tokens.
 * @property {string} auth.jwtSecret - The secret key for JWT token generation.
 * @property {string} auth.signatureAlgorithm - The algorithm to be used for signing the JSON Web Tokens (JWTs). This should be one of the algorithms supported by the `jsonwebtoken` library. See {@link https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback|jsonwebtoken}.
*/
const config = {

  // Database configuration
  db: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "vhd_store",
    connectionTimeout: 60 * 1000,
  },

  // Server configuration
  server: {
    port: 3000,
  },

  // Authentication configuration
  auth: {
    saltRounds: 10,
    tokenExpiration: "14d",
    // Secrets in code is a no-no, and must be extracted in a future improvement
    jwtSecret: "8dfa6ba1860b8976622b0386f4fd8f552ec2786250a8147ff7cddf111b479fb436d33a24d5c1c445ed3da264c0582637bafde4b8c86c6dd95410e79a09739ef7",
    signatureAlgorithm: "HS256"
  }
}

module.exports = config;
