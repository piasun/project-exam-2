import { createContext, useContext, useState, useEffect } from 'react';
import { LOGIN_URL, REGISTER_URL } from '../constants/apiUrl';
import { saveToken, isLoggedIn, getUser, getToken } from './useLocalStorage';

const AuthContext = createContext(null);

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
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