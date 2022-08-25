import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;

  const login = (token, deadLine) => {
    localStorage.setItem("token", token);
    localStorage.setItem("deadLine", deadLine);
    logoutTimer = setTimeout(logout, deadLine - Date.now());
    setToken(token);
  };

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("deadLine");
    clearTimeout(logoutTimer);
  }, []);

  useEffect(() => {
    if (token) {
      let timeLeft = localStorage.getItem("deadLine") - Date.now();
      if (timeLeft < 6000) timeLeft = 0;
      logoutTimer = setTimeout(logout, timeLeft);
    }
  }, [token, logout]);

  const context = {
    token,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
