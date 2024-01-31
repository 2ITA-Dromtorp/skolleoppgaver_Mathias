// Login.js
import React, { useState } from "react";
import Quiz from "./Quiz";

const Login = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = () => {
    // Update state to hide the quiz
    setShowQuiz(false);
  };

  return (
    <div>
      {!showQuiz ? (
        // Render login form
        // (your existing login component)
        <button onClick={() => setShowQuiz(true)}>Start Quiz</button>
      ) : (
        // Render quiz component
        <Quiz onQuizComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default Login;
