const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const quiz = require("../src/quiz.json");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

let leaderboardData = [];

app.get("/leaderboard", (req, res) => {
  res.json(leaderboardData);
});

app.post("/leaderboard", (req, res) => {
  const { name, score } = req.body;
  leaderboardData.push({ name, score });
  leaderboardData.sort((a, b) => b.score - a.score);
  leaderboardData = leaderboardData.slice(0, 10); // Limit to top 10
  res.sendStatus(200);
});

app.get("/hints/:id", (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = quiz.find((q) => q.id === questionId);
  if (question) {
    res.json({ hint: question.hint });
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

app.get("/select", async (req, res) => {
  try {
    const easyQuestions = shuffleQuestions(
      quiz.filter((q) => q.difficulty === "easy")
    ).slice(0, 5);
    res.send(easyQuestions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/submit-answer", async (req, res) => {
  const { selectedAnswer, currentQuestion } = req.body;
  try {
    const question = quiz.find((q) => q.id === currentQuestion);
    const correctAnswer = question.correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    const result = isCorrect ? "Correct" : "Incorrect";
    console.log(
      `Question ${currentQuestion}: Your Answer = ${selectedAnswer} - Correct Answer = ${correctAnswer} - Result = ${result}`
    );
    res.json({ correct: isCorrect });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const { feedback } = req.body;
    console.log("Feedback:", feedback);
    res.status(200).json({ message: "Feedback received successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const shuffleQuestions = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
};

app.listen(port, () => console.log(`Server started on port ${port}`));
