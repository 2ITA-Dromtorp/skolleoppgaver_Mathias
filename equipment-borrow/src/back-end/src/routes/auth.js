const express = require("express");
const router = express.Router();
const userService = require("../services/users");
const authService = require("../services/auth");
const { removePasswordsFromUser } = require("../helpers/users");

/**
 * Route for logging in a user.
 * The request body should contain `username` and `password`.
 * If the credentials are valid, the response will contain the user object (without the password), a JWT token, and the expiration date of the token.
 * If the credentials are invalid, the response will have a status of 401 and a body of "Invalid credentials".
 */
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.getUserByUsername(username);
    if (!user) {
      console.warn(`User with username '${username}' not found`);
      res.status(401).send("Invalid credentials");
    }
    else if (await authService.validateCredentials(password, user.password)) {
      console.info(`User with username '${username}' logged in`);
      removePasswordsFromUser(user);
      const token = authService.createJwtToken(user);
      const decodedToken = authService.decodeJwtToken(token);
      res.send({ user, token, expires: new Date(decodedToken.exp * 1000) });

    } else {
      console.warn(`Passwords do not match on username ${req.body.username}`);
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
