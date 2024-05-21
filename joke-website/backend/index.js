// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;
const jwtSecret = "hdgciewfddstdfgjjffdsdsdtfdhjmkdsresadhfj";
const saltRounds = 10; // Define the salt rounds for bcrypt hashing

app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    res.locals.connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "jokes_database",
    });
    next();
  } catch (err) {
    console.error("Error connecting to database: " + err.stack);
    next(err);
  }
});

// Endpoint for user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery =
      "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await res.locals.connection.execute(insertQuery, [
      username,
      hashedPassword,
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

// Endpoint for user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required" });
      return;
    }

    const query = "SELECT * FROM users WHERE username = ?";
    const [userList] = await res.locals.connection.execute(query, [username]);
    if (userList.length !== 1) {
      throw new Error("Username not found");
    }

    const user = userList[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Endpoint for fetching jokes as memes
app.get("/memes", async (req, res) => {
  try {
    const query = "SELECT setup as title, delivery as imageUrl FROM jokes";
    const [jokes] = await res.locals.connection.execute(query);
    res.status(200).json(jokes);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
