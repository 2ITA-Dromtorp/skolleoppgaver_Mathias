// Quiz.js
import React, { useState } from "react";

const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  // Add more questions as needed
];

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const calculateScore = () => {
    return questions.reduce(
      (score, question, index) => score + (question.correctAnswer === selectedAnswer[index] ? 1 : 0),
      0
    );
  };

  const handleNextQuestion = async () => {
    // Check if the selected answer is correct
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;

    // Log the answer
    console.log(`Question ${currentQuestion + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`);

    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz is complete
      const score = calculateScore();
      onQuizComplete(score);

      // Send a POST request with the score
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        console.error('Failed to send score');
      }
    }
  };

  return (
    <div>
      <h2>{questions[currentQuestion].text}</h2>
      <ul>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                disabled={loading}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={loading || selectedAnswer === null}>
        {loading ? "Checking answer..." : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
