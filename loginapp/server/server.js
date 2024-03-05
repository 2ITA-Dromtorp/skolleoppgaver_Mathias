const quiz = require('./quiz.json');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

// Shuffle function to randomize the order of questions
const shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
};

// Routes
app.get('/select', async (req, res) => {
    try {
        // Filter easy difficulty questions, shuffle them, and send 5 random questions
        const easyQuestions = shuffleQuestions(quiz.filter(q => q.difficulty === "easy")).slice(0, 5);
        res.send(easyQuestions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/submit-answer', async (req, res) => {
    const { selectedAnswer, currentQuestion } = req.body;
    try {
        const correctAnswer = quiz.find(q => q.id === currentQuestion).correctAnswer;
        res.json({ correct: selectedAnswer === correctAnswer });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
