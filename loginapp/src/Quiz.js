import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = ({ apiUrl }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(null); // Timer state

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Start timer when questions load
    const countdown = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(countdown); // Cleanup
  }, [questions]);

  useEffect(() => {
    // Handle timer completion
    if (timer === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timer, showResult]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${apiUrl}/select`);
      const data = await response.json();
      setQuestions(data);
      setTimer(60); // Set initial timer (60 seconds)
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedOption;

    fetch(`${apiUrl}/submit-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedAnswer,
        currentQuestion: currentQuestion.id,
      }),
    })
      .then((res) => {
        res.json().then((response) => {
          if (response.correct) {
            setScore(score + 1);
          }
          handleNextQuestion();
        });
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setTimer(60); // Reset timer for next question
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setShowResult(false);
    setTimer(60);
    fetchQuestions(); // Fetch questions again for restart
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>{questions[currentQuestionIndex]?.question}</h3>
          <p>Time left: {timer} seconds</p> {/* Display timer */}
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
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
