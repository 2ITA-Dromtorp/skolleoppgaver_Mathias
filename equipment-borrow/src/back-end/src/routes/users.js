const express = require("express");
const userService = require("../services/users");
const { removePasswordsFromUser, removePasswordsFromUserArray } = require("../helpers/users");
const { hashPassword } = require("../services/auth");
const { ensureAuthenticatedAdmin, ensureAuthenticated } = require("../middleware/api-access-validation");

const router = express.Router();


/**
 * Route for getting list of all users or a specific user based on the username query parameter.
 */
router.get("/", ensureAuthenticatedAdmin(), async (req, res, next) => {
  try {
    if (req.query.username) {
      // Filter by username
      console.info(`Query user by username '${req.query.username}'`);
      const user = await userService.getUserByUsername(req.query.username.toString());
      if (user) {
        res.json(removePasswordsFromUser(user));
      } else {
        res.status(404).send("User not found");
      }
    } else {
      // Get All
      console.info(`Get all users`);
      const users = await userService.getAllUsers();
      res.status(200).json(removePasswordsFromUserArray(users));
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Route for getting user based on ID.
 */
router.get("/:id([0-9]+)", ensureAuthenticatedAdmin(), async (req, res, next) => {
  try {
    console.info(`Query user by id '${req.params.id}'`);
    const user = await userService.getUserById(Number.parseInt(req.params.id));
    if (user) {
      res.json(removePasswordsFromUser(user));
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Route for creating a new user.
 */
router.post("/", ensureAuthenticatedAdmin(), async (req, res, next) => {
  try {
    // TODO: Validate user object (using joi.dev or similar)

    const newUser = req.body;

    if ((newUser?.password ?? 0).length === 0) {
      res.status(400).send("Password must be set");
    }

    newUser.password = await hashPassword(newUser.password);

    console.info(`Create user '${req.body.username}'`, newUser);

    const user = await userService.createUser(req.body);
    if (user) {
      res.status(201).json(removePasswordsFromUser(user));
    } else {
      res.status(400).send("A user with the same username already exists");
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Route for updating a user based on ID.
 */
router.put("/:id([0-9]+)", ensureAuthenticated(), async (req, res, next) => {
  try {
    if (req["auth"].userRole !== "admin" && req.params.id != req["auth"].id) {
      // Users that are not admin can only update their own data
      return res.status(403).json({ message: `Operation requires admin role` });
    }

    // TODO: Validate user object (using joi.dev or similar)
    const updatedUser = req.body;
    if (updatedUser == null || updatedUser.id == null || updatedUser.id != req.params.id || updatedUser.firstName == null || updatedUser.lastName == null) {
      res.status(400).send("User data missing or invalid");
      return;
    }

    console.info(`Update user by id '${req.params.id}'`);

    const currentUser = await userService.getUserById(Number.parseInt(req.params.id));
    if (currentUser == null) {
      res.status(404).send("User not found");
    }

    // Update password if changed (identified by having a value)
    if (updatedUser.password?.length > 0) {
      console.debug(`Updating password on user id '${req.params.id}'`);
      updatedUser.password = await hashPassword(updatedUser.password);
    } else {
      updatedUser.password = currentUser.password;
    }

    // Ensure only admin can set certain user properties such as role and type
    if (req["auth"].userRole !== "admin" && (updatedUser.userType !== currentUser.userType || updatedUser.userRole !== currentUser.userRole)) {
      console.warn("Resetting userType and Role as only admin can change those values");
      updatedUser.userType = currentUser.userType;
      updatedUser.userRole = currentUser.userRole;
    }

    const user = await userService.updateUser(updatedUser);
    if (user) {
      res.status(200).json(removePasswordsFromUser(user));
    } else {
      res.status(400).send("User not updated");
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Route for deleting a user based on ID.
 */
router.delete("/:id([0-9]+)", ensureAuthenticatedAdmin(), async (req, res, next) => {
  try {
    console.info(`Delete user by id '${req.params.id}'`);
    const userWasDeleted = await userService.deleteUser(Number.parseInt(req.params.id));
    if (userWasDeleted) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
