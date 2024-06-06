import { createContext, useState } from "react";

import authService from "../services/auth-service";

/**
 * Context object for managing authentication state.
 */
const AuthContext = createContext(null);

/**
 * Provides authentication functionality to the application.
 */
function AuthProvider({ children, ...rest }) {
  const [authData, setAuthData] = useState(authService.getCachedAuth())

  /**
   * Logs in the user.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} - A promise that resolves to the authentication result.
   */
  const login = async (username, password) => {
    const authResult = await authService.login(username, password);
    setAuthData(authResult.auth);
    return authResult
  }

  /**
   * Logs out the user
   */
  const logout = () => {
    authService.logout();
    setAuthData(null);
  }

  /**
   * The authentication context object.
   *
   * @typedef {Object} Auth
   * @property {Function} login - The login function.
   * @property {Function} logout - The logout function.
   * @property {Object} user - The authenticated user.
   * @property {string} token - The authentication token.
   * @property {boolean} tokenValid - Indicates if the authentication token is valid.
   * @property {boolean} userIsAdmin - Indicates if the authenticated user is an admin.
   */
  const auth = {
    login,
    logout,
    user: authData?.user,
    token: authData?.token,
    tokenValid: authService.validateToken(authData?.expiresOn ?? 0),
    userIsAdmin: authData?.user?.userRole === "admin"
  };

  return (
    <AuthContext.Provider value={auth} {...rest}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider }
export default AuthProvider;
