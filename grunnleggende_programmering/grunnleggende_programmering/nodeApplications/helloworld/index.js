const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const path = require('path');


// Use connection pooling for better scalability and performance
const connection = mysql.createPool({
  connectionLimit: 10, // Adjust according to your requirements
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'dromtorp',
});

// Middleware to handle errors and set appropriate headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html'); // Change content type to HTML
  next();
});

// Define a route to fetch data
app.get('/', (req, res) => {
  // Use the connection pool to handle multiple requests efficiently
  connection.query('SELECT * FROM elev', (error, results, fields) => {
    // Handle connection errors
    if (error) {
      console.error('Error connecting to the database:', error);
      res.status(500).send('<p>Error: Internal Server Error</p>');
      return;
    }

    // HTML code for the navigation bar
    const navBar = `
      <div class="navbar">
        <a href="#">select</a>
        <a href="#">update</a>
        <a href="#">insert</a>
        <a href='#'>delete</a>
      </div>
    `;

    // HTML response with the navigation bar and data
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express App</title>
        <link rel="stylesheet" href="styles.css"> <!-- Corrected path to styles.css -->
      </head>
      <body>
        ${navBar}
        <div class="content">
          <pre>${JSON.stringify(results, null, 2)}</pre>
        </div>
      </body>
      </html>
    `);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});