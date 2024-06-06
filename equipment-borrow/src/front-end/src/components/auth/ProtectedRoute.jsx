import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthRequestInterceptor } from "../../interceptors/AuthRequestInterceptor";
import Login from '../../pages/Login';

/**
 * A component that renders the protected route only if a user is authenticated - and (if provided) has the correct user role; otherwise renders the Login page.
 */
export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { tokenValid, user } = useAuth();

  if (tokenValid === false) {
    return <Login />;
  }

  if ((allowedRoles?.length ?? 0) > 0 && !allowedRoles.includes(user.userRole)) {
    // Missing required role - future improvement is telling the user about it
    return <Login />;
  }

  return (
    <AuthRequestInterceptor>
      <Outlet />
    </AuthRequestInterceptor>
  );
};

export const ProtectedRouteAdmin = () => <ProtectedRoute allowedRoles={['admin']} />;
export const ProtectedRouteUser = () => <ProtectedRoute />;



export default ProtectedRoute;
