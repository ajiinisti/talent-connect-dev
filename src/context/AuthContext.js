import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    navigate("/program");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const getCurrentRole = () => {
    return JSON.parse(localStorage.getItem("user"))?.Role;
  };
  return (
    <AuthContext.Provider value={{ login, logout, getCurrentUser, getCurrentRole }}>
      {children}
    </AuthContext.Provider>
  );
};
