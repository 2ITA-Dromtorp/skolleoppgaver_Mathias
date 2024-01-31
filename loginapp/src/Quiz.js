// Quiz.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Quiz = ({ onQuizComplete }) => {
  const history = useHistory();
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

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleShowScore = () => {
    history.push("/score", { score: calculateScore(), total: questions.length });
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
    </div>
  );
};

export default Quiz;
