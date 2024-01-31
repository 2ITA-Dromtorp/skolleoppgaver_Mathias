// Quiz.js
import React, { useState } from "react";

const questions = [
  // ... (unchanged)
];

const Quiz = ({ onQuizComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;

    console.log(`Answer to Question ${currentQuestion + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      onQuizComplete();
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f8f8f8' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{questions[currentQuestion].text}</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block' }}>
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
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={handleNextQuestion}
        disabled={loading || selectedAnswer === null}
      >
        {loading ? "Checking answer..." : currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
