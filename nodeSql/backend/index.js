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
      database: "dromtorp",
    });
    next();
  } catch (err) {
    console.error("Error connecting to database: " + err.stack);
    next(err);
  }
});

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database: ' + err.stack);
//     return;
//   }
//   console.log('Connected to database as id ' + connection.threadId);
// });

// Endpoint for handling user registration
app.post("/register", async (req, res) => {
  const { firstName, lastName, username, password, phoneNumber } = req.body;

  // Set default values for userType and userRole
  const userType = "Student";
  const userRole = "Member";

  try {
    // Check if all required fields are provided
    if (!firstName || !lastName || !username || !password || !phoneNumber) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Check if the username already exists in the database

    const usernameCheckQuery = "SELECT * FROM user WHERE username = ?";
    const [exsistingUsers] = await res.locals.connection.execute(
      usernameCheckQuery,
      [username]
    );
    if (exsistingUsers.length > 0) {
      // Username already exists
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const insertQuery =
      "INSERT INTO user (firstName, lastName, username, password, phoneNumber, userType, userRole) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const [result] = await res.locals.connection.execute(insertQuery, [
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      userType,
      userRole,
    ]);

    if (result.affectedRows !== 1) {
      throw new Error("Error inserting new user into database");
    }
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Endpoint for handling user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("LOGIN", username, password);
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

// Endpoint for fetching equipment data
app.get("/equipment", checkIfAuthenticated, async (req, res) => {
  try {
    const query = "SELECT * FROM equipment";
    const [equipment] = await res.locals.connection.execute(query);
    res.status(200).json(equipment);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for borrowing equipment
app.post("/borrow", checkIfAuthenticated, async (req, res) => {
  try {
    const { UtstyrID } = req.body;
    const borrowQuery =
      "UPDATE equipment SET available = available - 1 WHERE id = ? AND available > 0";
    const [updateEquipmentResult] = await res.locals.connection.execute(
      borrowQuery,
      [UtstyrID]
    );

    if (updateEquipmentResult.affectedRows === 0) {
      // No available equipment
      res.status(400).json({ message: "No available equipment" });
      return;
    }

    const insertQuery =
      "INSERT INTO loan (userId, equipmentId, loanDate) VALUES (?, ?, NOW())";
    const [createLoanResult] = await res.locals.connection.execute(
      insertQuery,
      [req.auth.id, UtstyrID]
    );
    if (updateEquipmentResult.affectedRows !== 1) {
      res.status(500).json({ message: "loan not created" });
      return;
    }

    res.status(201).json({ message: "loan created" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint for returning equipment
app.post("/return", checkIfAuthenticated, async (req, res) => {
  const { loanId, equipmentId } = req.body;
  try {
    // Set equipment returned
    const updateLoanQuery = `
    UPDATE loan
    SET returnDate = NOW()
    WHERE id = ? AND userId = ? AND loanDate <= NOW() AND returnDate IS NULL`;
    const [updateLoanResult] = await res.locals.connection.execute(
      updateLoanQuery,
      [loanId, req.auth.id]
    );

    if (updateLoanResult.affectedRows !== 1) {
      console.warn(
        "Failed to set loan returndate",
        updateLoanResult.affectedRows,
        updateLoanResult.reason
      );
      res.status(400).json({ message: "Item has already been returned" });
      return;
    }

    const updateEquipmentQuery =
      "UPDATE equipment SET available = available + 1 WHERE id = ?";
    const [updateEquipmentResult] = await res.locals.connection.execute(
      updateEquipmentQuery,
      [equipmentId]
    );

    if (updateEquipmentResult.affectedRows !== 1) {
      res.status(500).json({ message: "Unable to update equipment status" });
      return;
    }
    res.status(201).json({ message: "loan Returned" });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Endpoint for fetching borrowed equipment for a specific student ID
app.get("/borrowed/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId == null) {
      throw new Error("UserId not provided");
    }

    const query = `
    SELECT equipment.*, loan.id as loanId, loan.loanDate, loan.returnDate
    FROM equipment
    JOIN loan ON equipment.id = loan.equipmentId
    WHERE loan.userId = ? AND loan.returnDate IS NULL
  `;

    const [result] = await res.locals.connection.execute(query, [userId]);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
