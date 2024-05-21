const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/jokes/:type', async (req, res) => {
  try {
    const jokeType = req.params.type;
    let apiUrl = '';

    switch (jokeType) {
      case 'dark':
        apiUrl = 'https://official-joke-api.appspot.com/jokes/dark/random'; // Fetch dark jokes specifically
        break;
      case 'programming':
        apiUrl = 'https://official-joke-api.appspot.com/jokes/programming/random';
        break;
      case 'general':
        apiUrl = 'https://official-joke-api.appspot.com/jokes/general/random';
        break;
      default:
        apiUrl = 'https://official-joke-api.appspot.com/random_joke';
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('Fetched joke:', data);

    if (Array.isArray(data) && data.length > 0) {
      res.json({ joke: data[0] });
    } else {
      res.json({ joke: data });
    }
  } catch (error) {
    console.error('Error fetching random joke:', error);
    res.status(500).json({ error: 'Failed to fetch random joke' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
