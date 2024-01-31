// Quiz.js
import React, { useState } from "react";

const questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  // Add more questions as needed
];

const Quiz = ({ onQuizComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if the selected answer is correct
    const isCorrect = questions[0].correctAnswer === selectedAnswer;

    // Log the answer
    console.log(`Answer: ${isCorrect ? 'Correct' : 'Incorrect'}`);

    // Finish the quiz
    onQuizComplete();
  };

  return (
    <div>
      <h2>{questions[0].text}</h2>
      <ul>
        {questions[0].options.map((option, index) => (
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
        {loading ? "Checking answer..." : "Finish"}
      </button>
    </div>
  );
};

export default Quiz;
