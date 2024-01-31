// Quiz.js
import React, { useState } from "react";

const questions = [
  {
    id: 1,
    text: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    text: "Which programming language is known for its use in building interactive web pages?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    id: 3,
    text: "What is the purpose of CSS?",
    options: ["To define the structure of a webpage", "To add interactivity to a webpage", "To style the presentation of a webpage", "To perform calculations in a webpage"],
    correctAnswer: "To style the presentation of a webpage",
  },
  {
    id: 4,
    text: "In JavaScript, what is a function?",
    options: ["A piece of code that performs a specific task", "A way to declare variables", "A type of loop", "A type of array"],
    correctAnswer: "A piece of code that performs a specific task",
  },
];

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [loading, setLoading] = useState(false);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz is complete
      onQuizComplete(selectedAnswers);
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
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index}>
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
      <button onClick={handleNextQuestion} disabled={loading || selectedAnswers[currentQuestion] === null}>
        {loading ? "Checking answer..." : "Next"}
      </button>

      {/* Display score at the end */}
      {currentQuestion === questions.length && (
        <div>
          <h2>Quiz Complete!</h2>
          <p>Your Score: {calculateScore()} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
