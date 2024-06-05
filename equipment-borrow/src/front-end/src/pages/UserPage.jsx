import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import userService from "../services/user-service";
import { UserEditModalForm, UserTable } from "../components/user";

/**
 * Renders the UserPage component.
 * This component displays a list of users and provides functionality to create, edit, and delete users.
 */
function UserPage() {
  const [users, setUsers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [userBeingEdited, setUserBeingEdited] = useState(undefined);

  /**
   * Refreshes the list of users by fetching all users from the userService.
   */
  const refreshUsers = async () => {
    try {
      const allUsers = await userService.getAll();
      setUsers(allUsers);
    } catch (error) {
      console.error("Get users error", error);
    }
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  /**
   * Handles the creation of a new user.
   * Sets the user being edited to an empty state and shows the edit form.
   */
  const handleCreateNew = async () => {
    setUserBeingEdited({
      firstName: "",
      lastName: "",
      username: "",
      userRole: userService.validUserRoles[0].value,
      userType: userService.validUserTypes[0].value,
    });
    setShowEditForm(true);
  };

  /**
   * Handles the edit action for a user.
   */
  const handleEdit = async (userToEdit) => {
    setUserBeingEdited(userToEdit);
    setShowEditForm(true);
  };

  /**
   * Handles the cancellation of the edit operation.
   * Resets the user being edited and hides the edit form.
   */
  const handleEditCancelled = async () => {
    setUserBeingEdited(undefined);
    setShowEditForm(false);
  };

  /**
   * Handles saving a user.
   */
  const handleSaveUser = async (user) => {
    try {
      if (user.id == null) {
        await userService.create(user);
      } else {
        await userService.update(user);
      }

      setUserBeingEdited(undefined);
      setShowEditForm(false);
      refreshUsers();
    } catch (error) {
      console.error("Failed saving user: " + error?.message, user, error);
    }
  };

  /**
   * Deletes a user by their ID.
   */
  const handleDelete = async (userId) => {
    try {
      console.info("Delete user", userId);
      await userService.deleteById(userId);
      await refreshUsers();
    } catch (error) {
      console.error("Failed to delete user: " + error?.message, userId, error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-end m-2">
          <Button variant="outline-secondary" onClick={handleCreateNew}>
            +
          </Button>
        </Col>
      </Row>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserEditModalForm user={userBeingEdited} show={showEditForm && userBeingEdited} onSave={handleSaveUser} onCancel={handleEditCancelled} />
    </Container>
  );
}

export default UserPage;
