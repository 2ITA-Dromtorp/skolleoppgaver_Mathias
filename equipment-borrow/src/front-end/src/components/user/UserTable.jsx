import { validUserRoles, validUserTypes } from "../../services/user-service";
import { useAuth } from "../auth/useAuth";
import { Button, Table } from "react-bootstrap";

/**
 * Renders a table of users.
 */
function UserTable({ users, onEdit = null, onDelete = null }) {
  const { user, userIsAdmin } = useAuth();

  /**
   * Handles the edit action for a user.
   * @param {number} userId - The ID of the user to edit.
   */
  const handleEdit = (userId) => {
    onEdit?.(userId);
  }

  /**
   * Handles the delete action for a user.
   * @param {number} userId - The ID of the user to be deleted.
   */
  const handleDelete = (userId) => {
    onDelete?.(userId);
  }

  // Checks if a user is editable
  const isUserEditable = item => onEdit && (userIsAdmin || item.id == user.id);

   // Checks if the given item is the current user.
  const isCurrentUser = item => item.id === user.id;

  // Only allow delete if the user is not the current user and is Admin
  const isUserDeletable = item => onDelete && (userIsAdmin && !isCurrentUser(item));

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th className="col-1">#</th>
        <th className="col-3">Fornavn</th>
        <th className="col-3">Etternavn</th>
        <th className="col-2">Brukernavn</th>
        <th className="col-1">Rolle</th>
        <th className="col-1">Type</th>
        <th className="col-1"></th>
      </tr>
    </thead>
    <tbody>
      {users.map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.username}</td>
          <td>{validUserRoles.find(_ => _.value === item.userRole)?.label}</td>
          <td>{validUserTypes.find(_ => _.value === item.userType)?.label}</td>
          <td>
            {isUserEditable(item) && (
              <Button onClick={() => handleEdit(item)} variant="outline-secondary" size="sm" className="mx-2">
                ✏️
              </Button>
            )}

            {isUserDeletable(item) && (
              <Button onClick={() => handleDelete(item.id)} variant="outline-danger" size="sm">
                Slett
              </Button>
            )}

            {isCurrentUser(item) && " (deg)"}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  );
}

export default UserTable;
