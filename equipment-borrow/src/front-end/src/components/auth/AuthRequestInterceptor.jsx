import axios from "axios";
import { useAuth } from './useAuth';

/**
 * Interceptor that intercepts outgoing requests and adds authentication headers.
 */
export function AuthRequestInterceptor({ children }) {
  const { token, tokenValid, logOut } = useAuth();

  axios.interceptors.request.use(async (config) => {
    if (!tokenValid) {
      logOut();
      return Promise.reject(new Error("User not authenticated."));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return <>{children}</>;
}

export default AuthRequestInterceptor;
