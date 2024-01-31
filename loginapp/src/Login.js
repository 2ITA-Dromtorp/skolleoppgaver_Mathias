// Login.js
import React, { useState } from "react";
import Quiz from "./Quiz";

const Login = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizComplete = (answers) => {
    // Update state to hide the quiz
    setShowQuiz(false);

    // Log the answers (you can use them as needed)
    console.log("User's Answers:", answers);
  };

  return (
    <div>
      {!showQuiz ? (
        // Render login form or any other content
        <button onClick={() => setShowQuiz(true)}>Start Quiz</button>
      ) : (
        // Render quiz component
        <Quiz onQuizComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default Login;
