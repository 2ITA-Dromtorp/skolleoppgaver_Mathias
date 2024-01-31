// Login.js
import React, { useState } from "react";
import Quiz from "./Quiz";

const Login = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = () => {
    // Redirect to a website after completing the quiz
    window.location.href = "https://cornhub.website/";
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
