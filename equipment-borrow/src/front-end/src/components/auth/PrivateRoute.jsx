import { Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import { AuthRequestInterceptor } from "./AuthRequestInterceptor";
import Login from '../../pages/Login';

export const PrivateRoute = () => {
  const { tokenValid } = useAuth();

  if (tokenValid === false) {
    return <Login />;
  }

  return (
    <AuthRequestInterceptor>
      <Outlet />
    </AuthRequestInterceptor>
  );
};

export default PrivateRoute;
