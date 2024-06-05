/**
 * Middleware function to handle 404 Not Found errors.
 */
function notFound(req, res, next) {
  res.status(404).json({ message: "Not Found" });
}

/**
 * Error handler middleware.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
}

module.exports = { notFound, errorHandler };
