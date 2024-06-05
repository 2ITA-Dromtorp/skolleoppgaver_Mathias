// db.js
const mysql = require('mysql2/promise');
const config = require('../config');

// Create a connection pool
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectTimeout: config.db.connectionTimeout,
});

/**
 * Executes a SQL query and returns the results.
 * @param {string} sql - The SQL query to execute.
 * @param {Array} [params] - The optional parameters to be used in the query.
 * @returns {Promise<any>} - A promise that resolves to the query results.
 */
async function query(sql, params = undefined) {
  // Get a DB connection from the pool
  const connection = await pool.getConnection();

  try {
    const [results,] = await connection.execute(sql, params);
    return results;
  }
  finally {
    // Return/release connection back to pool
    connection.release();
  }
}

/**
 * Executes a SQL query with the provided parameters and expects a single row as result.
 * @param {string} sql - The SQL query to execute.
 * @param {Array} params - The parameters to be used in the query.
 * @returns {Promise<any|null>} - A promise that resolves to the single query result or null if no result found.
 * @throws {Error} If more than one row is found.
 */
async function querySingleRow(sql, params) {
  const results = await query(sql, params);

  if (results.length > 1) {
    throw new Error('Expected a single row, but found more than one');
  }

  return results[0] || null;
}

/**
 * Helper that returns an empty array if the input is null or undefined.
 * Otherwise, returns the input.
 *
 * @param {Array} rows - The array of rows.
 * @returns {Array} - An empty array if `rows` is null or undefined, otherwise the input `rows`.
 */
function emptyOrRows(rows) {
  return rows ?? [];
}

module.exports = { pool, query, emptyOrRows, querySingleRow };
