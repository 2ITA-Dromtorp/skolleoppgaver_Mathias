// Quiz.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = ({ onQuizComplete }) => {
  const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    // ...rest of the questions
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = async () => { // Declare this function as async
    // Check if the selected answer is correct
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswers[currentQuestion];

    // Display a message to the user
    setMessage(isCorrect ? 'Correct!' : 'Incorrect.');

    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setMessage(null);
    } else {
      // Quiz is complete
      const score = calculateScore();
      onQuizComplete(score);

      // Send a POST request with the score
      const response = await fetch('/api/score', { // Use await here
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

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer);
    return correctAnswers.length;
  };

  return (
    <div>
      <h2>{questions[currentQuestion].text}</h2>
      <ul>
        {questions[currentQuestion].options.map((option) => (
          <li key={questions[currentQuestion].id}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswers[currentQuestion] === option}
                onChange={() => handleAnswerSelect(option)}
                disabled={loading}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      {message && <p>{message}</p>}
      <button onClick={handleNextQuestion} disabled={loading || selectedAnswers[currentQuestion] === null}>
        {loading ? "Checking answer..." : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
