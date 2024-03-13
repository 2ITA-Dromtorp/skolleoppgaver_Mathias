import React, { useState, useEffect } from "react";
import "./Quiz.css";
import Hints from './Hints';

const Quiz = ({ apiUrl }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(null);
  const [name, setName] = useState("");
  const [hintsVisible, setHintsVisible] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [questions]);

  useEffect(() => {
    if (timer === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timer, showResult]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${apiUrl}/select`);
      const data = await response.json();
      setQuestions(data);
      setTimer(30);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedOption;

    try {
      const response = await fetch(`${apiUrl}/submit-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedAnswer,
          currentQuestion: currentQuestion.id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.correct) {
          setScore(score + 1);
        }
        handleNextQuestion();
      } else {
        console.error('Failed to submit answer');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setTimer(30);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setShowResult(false);
    setTimer(30);
    fetchQuestions();
  };

  const handleSubmitLeaderboard = async () => {
    try {
      await fetch(`${apiUrl}/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score }),
      });
    } catch (error) {
      console.error("Error submitting to leaderboard:", error);
    }
  };

  const handleHintClick = () => {
    setHintsVisible(!hintsVisible);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>{questions[currentQuestionIndex]?.question}</h3>
          <p>Time left: {timer} seconds</p>
          <button onClick={handleHintClick}>
            {hintsVisible ? "Hide Hint" : "Show Hint"}
          </button>
          {hintsVisible && <Hints apiUrl={apiUrl} questionId={questions[currentQuestionIndex]?.id} />}
          <form>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
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
          <p>
            Your score: {score} out of {questions.length}
          </p>
          <form onSubmit={handleSubmitLeaderboard}>
            <label>
              Enter your name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button type="submit">Submit to Leaderboard</button>
          </form>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
