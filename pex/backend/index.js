const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

const app = express();
const port = 3001;
const jwtSecret = "hdgciewfddstdfgjjffdsdsdtfdhjmkdsresadhfj";
const saltRounds = 10; // Define the salt rounds for bcrypt hashing

const checkIfAuthenticated = expressjwt({
  secret: jwtSecret,
  algorithms: ["HS256"],
});

app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    res.locals.connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "matdatabase",
    });
    next();
  } catch (err) {
    console.error("Error connecting to database: " + err.stack);
    next(err);
  }
});

// Endpoint for handling user registration
app.post("/register", async (req, res) => {
  const { firstName, lastName, username, password, phoneNumber } = req.body;

  const userRole = "Member";

  try {
    if (!firstName || !lastName || !username || !password || !phoneNumber) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const usernameCheckQuery = "SELECT * FROM user WHERE username = ?";
    const [existingUsers] = await res.locals.connection.execute(
      usernameCheckQuery,
      [username]
    );
    if (existingUsers.length > 0) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery =
      "INSERT INTO user (firstName, lastName, username, password, phoneNumber, userRole) VALUES (?, ?, ?, ?, ?, ?)";

    const [result] = await res.locals.connection.execute(insertQuery, [
      firstName,
      lastName,
      username,
      hashedPassword,
      phoneNumber,
      userRole,
    ]);

    if (result.affectedRows !== 1) {
      throw new Error("Error inserting new user into database");
    }
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for handling user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if ((username?.length ?? 0) === 0) {
      throw new Error("Username is required");
    }

    const query = "SELECT * FROM user WHERE username = ?";
    const [userList] = await res.locals.connection.execute(query, [username]);
    if (userList.length !== 1) {
      throw new Error("Username not found");
    }

    const user = userList[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    delete user.password;
    const token = jwt.sign(user, jwtSecret, {
      expiresIn: "1d",
    });
    res.send({ user: user, token: token });
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Endpoint for fetching food data
app.get("/food", checkIfAuthenticated, async (req, res) => {
  try {
    const query = "SELECT * FROM food";
    const [food] = await res.locals.connection.execute(query);
    res.status(200).json(food);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for updating food availability
app.post("/food/update", checkIfAuthenticated, async (req, res) => {
  try {
    const { id, available } = req.body;
    const updateQuery =
      "UPDATE food SET available = ? WHERE id = ?";
    const [updateResult] = await res.locals.connection.execute(updateQuery, [
      available,
      id
    ]);

    if (updateResult.affectedRows !== 1) {
      res.status(400).json({ message: "Unable to update food availability" });
      return;
    }

    res.status(200).json({ message: "Food availability updated" });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
