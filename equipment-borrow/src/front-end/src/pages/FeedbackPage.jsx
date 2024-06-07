import { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";

/**
 * Renders the Feedback Page component.
 */
function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() !== '') {
      console.log(feedback);
      setFeedback('');
      setIsFeedbackSubmitted(true);
      console.log(`Feedback: ${feedback}`);
    }
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <Container className="col-6">
      <h4>Give Us Feedback</h4>
      {isFeedbackSubmitted && <Alert variant="success">Thank you for your feedback! We really appreciate it.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedbackControl">
          <Form.Control
            as="textarea"
            rows={5}
            value={feedback}
            onChange={handleChange}
            placeholder="Type your feedback here..."
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a feedback.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={feedback.trim() === ''}>
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default FeedbackPage;