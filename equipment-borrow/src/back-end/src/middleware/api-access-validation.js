const config = require("../config");
const { expressjwt: jwt } = require("express-jwt");

/**
 * Middleware function to ensure that the request is authenticated.
 */
function ensureAuthenticated() {
  return jwt({
    secret: config.auth.jwtSecret,
    // @ts-ignore
    algorithms: [config.auth.signatureAlgorithm],
  });
}

/**
 * Middleware function to require a specific role for accessing an API endpoint.
 *
 * @param {string} role - The required role for accessing the endpoint.
 */
function requireRole(role) {
  return function (req, res, next) {
    if (req.auth?.userRole !== role) {
      return res.status(403).json({ message: `Operation requires ${role} role` });
    }
    next();
  };
}


/**
 * Combines the ensureAuthenticated and requireRole middleware functions to ensure that the user is authenticated and has the specified role.
 *
 * @param {string} role - The role required for accessing the API.
 */
function ensureAuthenticatedAndAuthorized(role) {
  return [ensureAuthenticated(), requireRole(role)];
}

/**
 * Ensures that the user is authenticated as an admin.
 */
function ensureAuthenticatedAdmin() {
  return ensureAuthenticatedAndAuthorized("admin");
}

module.exports = {
  ensureAuthenticated,
  ensureAuthenticatedAndAuthorized,
  ensureAuthenticatedAdmin,
};
