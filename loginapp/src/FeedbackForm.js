import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = ({ apiUrl }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feedback })
      });
      if (response.ok) {
        console.log('Feedback submitted successfully');
        setFeedback('');
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-form-container"> {/* Apply feedback-form-container class */}
      <h2>Feedback Form</h2>
      <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;
