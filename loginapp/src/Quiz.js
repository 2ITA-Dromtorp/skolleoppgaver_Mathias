import React, { useState } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions] = useState([
    {
      id: 1,
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Logic'],
      correctAnswer: 'Hyper Text Markup Language'
    },
    {
      id: 2,
      question: 'What is the correct way to select an element with the id of "demo" using CSS?',
      options: ['#demo', '.demo', 'element.demo', '*demo'],
      correctAnswer: '#demo'
    },
    {
      id: 3,
      question: 'Which of the following programming languages is not a compiled language?',
      options: ['Java', 'C++', 'Python', 'C#'],
      correctAnswer: 'Python'
    },
    {
      id: 4,
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
      id: 5,
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci'
    }
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedOption;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    axios.post('http://localhost:3001/submit-answer', { selectedAnswer, isCorrect })
      .then((response) => {
        if (response.data.correct) {
          setScore(score + 1);
        }
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption('');
        } else {
          setShowResult(true);
        }
      })
      .catch((error) => {
        console.error('Error submitting answer:', error);
      });
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <form>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </form>
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
      ) : (
        <div>
          <h2>Quiz Result</h2>
          <p>Your score: {score} out of {questions.length}</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
