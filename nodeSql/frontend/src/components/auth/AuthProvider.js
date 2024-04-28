import { createContext, useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const isTokenValid = (tokenToValidate) => {
    const tokenToCheck = tokenToValidate || token;
    if (!tokenToCheck) {
      return false;
    }
    const decodedToken = jwtDecode(tokenToCheck);
    const current_time = Date.now().valueOf() / 1000;
    return decodedToken.exp > current_time;
  };

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/login", data);
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("site", response.data.token);
    } catch (error) {
      console.error("AUTH ERROR", error);
      throw new Error("Invalid credentials");
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logOut, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
