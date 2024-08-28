import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUser,
  saveUser,
  saveToken,
  clearStorage,
  isLoggedIn as checkIsLoggedIn,
} from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    const loggedIn = checkIsLoggedIn();
    setUser(user);
    setIsLoggedIn(loggedIn);
  }, []);

  const login = (userData, token) => {
    saveUser(userData);
    saveToken(token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearStorage();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
/*import { createContext, useContext } from 'react';
import useAuth from '../hooks/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}*/
