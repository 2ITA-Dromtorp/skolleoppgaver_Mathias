const express = require("express");
const { notFound, errorHandler } = require('./middleware/error-handlers');
const cors = require('cors');
const config = require("./config");

// Import Route Providers
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const app = express();
const port = config.server.port;

// Load middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);

// Handle "exceptions"
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => { console.info(`API Server lytter på http://localhost:${port}`); });
