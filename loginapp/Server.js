const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route for handling answer submissions
app.post('/submit-answer', (req, res) => {
  const { answer } = req.body;
  // Here you can validate the answer and send a response
  if (answer === 'correct-answer') {
    res.json({ correct: true });
  } else {
    res.json({ correct: false });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
