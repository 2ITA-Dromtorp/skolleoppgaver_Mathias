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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
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
      onQuizComplete();
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
