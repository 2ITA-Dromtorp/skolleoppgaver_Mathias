// Quiz.js
import React, { useState } from "react";
import "./Quiz.css";  // Import the CSS file

const questions = [
  // ... (unchanged)
];

const Quiz = ({ onQuizComplete }) => {
  // ... (unchanged)

  return (
    <div className="quiz-container">
      <h2 className="question-text">{questions[currentQuestion].text}</h2>
      <ul className="options-list">
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index} className="option-list-item">
            <label className="option-label">
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
      <button
        className="next-button"
        onClick={handleNextQuestion}
        disabled={loading || selectedAnswer === null}
      >
        {loading ? "Checking answer..." : currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
