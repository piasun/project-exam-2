import { createContext, useContext, useState, useEffect } from 'react';
import { LOGIN_URL, REGISTER_URL } from '../constants/apiUrl';

// Constants
const userKey = "user";
const tokenKey = "accessToken";

// AuthContext setup
const AuthContext = createContext(null);

// Local storage utility functions
export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function saveToken(accessToken) {
  saveToStorage(tokenKey, accessToken);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(userData) {
  const existingUser = getFromStorage(userKey);
  const updatedUser = existingUser ? { ...existingUser, ...userData } : userData;
  saveToStorage(userKey, updatedUser);
}

export function getUser() {
  return getFromStorage(userKey);
}

export function isLoggedIn() {
  return !!getFromStorage(userKey);
}

// useAuth custom hook
export function useAuth() {
  const [auth, setAuth] = useState({
    isAuthenticated: isLoggedIn(),
    user: getUser(),
    token: getToken()
  });

  const login = async (email, password) => {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      saveToken(data.accessToken);
      saveUser(data.user);
      setAuth({ isAuthenticated: true, user: data.user, token: data.accessToken });
    } else {
      throw new Error(data.message || 'Failed to login');
    }
  };

  const register = async (email, password, name, avatar, banner) => {
    console.log("Sending registration data:", { email, password, name, avatar, banner });
    
    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, avatar, banner })
    });
    
    const data = await response.json();
    console.log("Received response:", data);
    
    if (response.ok) {
      saveToken(data.accessToken);
      saveUser({ name: data.name, email: data.email, avatar: data.avatar, banner: data.banner });
      setAuth({ isAuthenticated: true, user: { name: data.name, email: data.email, avatar: data.avatar, banner: data.banner }, token: data.accessToken });
    } else {
      throw new Error(data.message || 'Failed to register');
    }
  };
  

  const logout = () => {
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    setAuth({ isAuthenticated: false, user: null, token: null });
  };

  useEffect(() => {
    if (getToken()) {
      setAuth(prev => ({ ...prev, isAuthenticated: true, user: getUser(), token: getToken() }));
    }
  }, []);

  return { auth, login, logout, register };
}

// AuthProvider component
export function AuthProvider({ children }) {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuth;
