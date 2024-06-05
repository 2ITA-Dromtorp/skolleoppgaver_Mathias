import { useAuth } from "../auth/useAuth";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { validUserRoles, validUserTypes } from "../../services/user-service";

/**
 * Renders a modal form for editing user details.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user details.
 * @param {boolean} props.show - Determines whether the modal is visible or hidden.
 * @param {Function} [props.onSave] - The function to be called when the form is saved.
 * @param {Function} [props.onCancel] - The function to be called when the form is canceled.
 * @returns {JSX.Element} The rendered UserEditModalForm component.
 */
function UserEditModalForm({ user, show, onSave = null, onCancel = null }) {
  const { userIsAdmin } = useAuth();
  const [formUser, setFormUser] = useState({password: "", ...user});

  useEffect(() => {
    setFormUser({password: "", ...user});
  }, [user]);

  /**
   * Handles the save action.
   */
  const handleSave = () => {
    onSave?.(formUser);
  }

  /**
   * Handles the input change event and updates the formUser state for the corresponding property name.
   */
  const handleInputChange = (event) => {
    setFormUser({ ...formUser, [event.target.name]: event.target.value });
  };

  /**
   * Handles the cancel action.
   */
  const handleCancel = () => {
    onCancel?.();
  }

  /**
   * Handles the close action.
   */
  const handleClose = () => {
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rediger Bruker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formUser && <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Brukernavn</Form.Label>
            <Form.Control type="text" name="username" value={formUser?.username} onChange={handleInputChange} disabled={user?.id > 0} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Passord</Form.Label>
            <Form.Control type="password" name="password" value={formUser?.password} onChange={handleInputChange} placeholder={user?.id > 0 ? "******" : ""} />
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Label>Fornavn</Form.Label>
            <Form.Control type="text" name="firstName" value={formUser?.firstName} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Etternavn</Form.Label>
            <Form.Control type="text" name="lastName" value={formUser?.lastName} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formUserRole">
            <Form.Label>Rolle</Form.Label>
            <Form.Select name="userRole" value={formUser.userRole} onChange={handleInputChange} size="sm" disabled={!userIsAdmin}>
              {validUserRoles.map((role) => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formUserType">
            <Form.Label>Type</Form.Label>
            <Form.Select name="userType" value={formUser.userType} onChange={handleInputChange} size="sm" disabled={!userIsAdmin}>
              {validUserTypes.map((userType) => (
                <option key={userType.value} value={userType.value}>{userType.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Avbryt
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lagre
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModalForm;
