import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storage = localStorage.getItem("user");

  const user = JSON.parse(storage);
  const token = user?.AccessToken;

  const values = { user, token };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuth };

export default AuthProvider;
