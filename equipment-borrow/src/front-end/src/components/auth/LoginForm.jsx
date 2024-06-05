import { useState } from "react";
import { Button, Form } from "react-bootstrap";

/**
 * A login form component.
 * @param {Object} props - The component props.
 * @param {Function} props.onSubmit - The function to handle form submission.
 * @param {string} [props.defaultUsername=""] - The default value for the username input field.
 * @param {string} [props.defaultPassword=""] - The default value for the password input field.
 * @returns {JSX.Element} The login form component.
 */
function LoginForm({ onSubmit, defaultUsername = "", defaultPassword = "" }) {
  const [username, setUsername] = useState(defaultUsername ?? "");
  const [password, setPassword] = useState(defaultPassword ?? "");
  const [validated, setValidated] = useState(false);
  const [valid, setValid] = useState(false);

  /**
   * Handles the change event for the username input field.
   * @param {object} e - The event object.
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Handles the change event for the password input field.
   * @param {object} e - The event object.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Validates the form and sets the validity state.
   *
   * @param {HTMLFormElement} form - The form element to be validated.
   * @returns {boolean} - Returns true if the form is valid, false otherwise.
   */
  const validateForm = form => {
    const isValid = form.checkValidity();
    setValid(isValid);
    !validated && setValidated(true);
    return isValid;
  }

  /**
   * Validates the form from the input element.
   */
  const validateFormFromInput = e => {
    validateForm(e.currentTarget.form);
  }

  /**
   * Handles the form submission.
   */
  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (validateForm(form) === false) {
      return;
    }

    onSubmit?.(username, password);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Brukernavn</Form.Label>
        <Form.Control type="text" placeholder="Ditt brukernavn" required minLength={2} value={username} onBlur={validateFormFromInput} onChange={handleUsernameChange}/>
        <Form.Control.Feedback type="invalid">Gyldig brukernavn må være satt</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password" className="mt-3">
        <Form.Label>Passord</Form.Label>
        <Form.Control type="password" placeholder="Ditt passord" required minLength={2} value={password} onBlur={validateFormFromInput} onChange={handlePasswordChange} />
        <Form.Control.Feedback type="invalid">Gyldig passord er påkrevd</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="text-center mt-3">
        <Button variant="primary" type="submit" disabled={!valid}>
          Logg inn
        </Button>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
