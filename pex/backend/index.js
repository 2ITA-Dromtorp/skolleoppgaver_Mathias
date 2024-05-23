const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const jwtSecret = 'hdgciewfddstdfgjjffdsdsdtfdhjmkdsresadhfj';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'matdatabase',
});

const checkIfAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const [result] = await connection.query('SELECT id, username, userRole FROM user WHERE id = ?', [decoded.userId]);
    if (!result.length) return res.status(401).json({ message: 'Unauthorized' });

    req.auth = result[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await connection.query('INSERT INTO user (username, password, userRole) VALUES (?, ?, ?)', [username, hashedPassword, 'User']);
    if (result.affectedRows !== 1) throw new Error('Error registering user');

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [result] = await connection.query('SELECT id, username, password, userRole FROM user WHERE username = ?', [username]);
    if (!result.length) return res.status(401).json({ message: 'Invalid username or password' });

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user.id, username: user.username, userRole: user.userRole } });
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/food', checkIfAuthenticated, async (req, res) => {
  try {
    const [food] = await connection.query('SELECT * FROM food WHERE available > 0');
    res.status(200).json(food);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/order', checkIfAuthenticated, async (req, res) => {
  const { userId, foodId, quantity } = req.body;

  if ((quantity ?? 0) == 0 || (userId ?? 0) == 0 || (foodId ?? 0) == 0) {
    res.status(500).send();
    return;
  }

  try {
    const insertQuery = 'INSERT INTO orders (userId, foodId, quantity) VALUES (?, ?, ?)';
    let [result] = await connection.execute(insertQuery, [userId, foodId, quantity]);
    if (result.affectedRows !== 1) throw new Error('Error inserting order into database');

    [result] = await connection.query('UPDATE food SET available = available - ? WHERE id = ?', [quantity, foodId]);
    if (result.affectedRows !== 1) throw new Error('Error updating food availability');
    res.status(201).json({ message: 'Order placed successfully' });

  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/admin/users', checkIfAuthenticated, async (req, res) => {
  try {
    if (req.auth.userRole !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    const [users] = await connection.query('SELECT id, username, userRole FROM user');
    res.status(200).json(users);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/admin/users/:id', checkIfAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    if (req.auth.userRole !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    [result] = await connection.query('DELETE FROM user where id = ?', [id]);

    if (result.affectedRows === 1) {
      res.status(204).send();
  } else {
      throw new Error("User not found");
  }

  } catch (err) {
    console.error(`Error deleting user: ${id}`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/admin/orders', checkIfAuthenticated, async (req, res) => {
  try {
    if (req.auth.userRole !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    const [orders] = await connection.query('SELECT * FROM orders');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/admin/stock', checkIfAuthenticated, async (req, res) => {
  try {
    if (req.auth.userRole !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    const [stock] = await connection.query('SELECT * FROM food');
    res.status(200).json(stock);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/food/:id', checkIfAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  try {
    const [result] = await connection.query('UPDATE food SET available = ? WHERE id = ?', [available, id]);
    if (result.affectedRows !== 1) throw new Error('Error updating food availability');

    res.status(200).json({ message: 'Food availability updated successfully' });
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
