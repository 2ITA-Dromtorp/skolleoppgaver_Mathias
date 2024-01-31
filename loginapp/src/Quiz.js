// Quiz.js
import React, { useState } from "react";

const Quiz = ({ onQuizComplete }) => {
  const questions = [
    {
      id: 1,
      text: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      correctAnswer: "Hyper Text Markup Language",
    },
    // ...rest of the questions
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleShowScore = () => {
    setShowScore(true);
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

      {/* Display "Next" or "Show Score" button based on the question */}
      {currentQuestion === questions.length - 1 ? (
        <button onClick={handleShowScore} disabled={loading || selectedAnswers[currentQuestion] === null}>
          {loading ? "Checking answer..." : "Show Score"}
        </button>
      ) : (
        <button onClick={handleNextQuestion} disabled={loading || selectedAnswers[currentQuestion] === null}>
          {loading ? "Checking answer..." : "Next"}
        </button>
      )}

      {/* Display score if showScore is true */}
      {showScore && (
        <div>
          <h2>Quiz Complete!</h2>
          <p>Your Score: {calculateScore()} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
