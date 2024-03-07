import React from 'react';
import quizData from './quiz.json'; // Update the import path

const Hints = ({ questionId }) => {
  // Find the question object from quizData based on questionId
  const question = quizData.find((q) => q.id === questionId);

  return (
    <div>
      {question && (
        <p>{question.hint}</p>
      )}
    </div>
  );
};

export default Hints;
