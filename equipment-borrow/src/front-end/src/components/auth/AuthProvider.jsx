import { createContext, useState } from "react";

import authService from "../../services/auth-service";

const AuthContext = createContext(null);

/**
 * Provides authentication functionality to the application.
 */
function AuthProvider({ children, ...rest }) {
  const [authData, setAuthData] = useState(authService.getCachedAuth())

  const login = async (username, password) => {
    const authResult = await authService.login(username, password);
    setAuthData(authResult.auth);
    return authResult
  }

  const logout = () => {
    authService.logout();
    setAuthData(null);
  }

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
