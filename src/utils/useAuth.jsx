
import { useState, useEffect } from 'react';
import { saveToken, getToken, saveUser, getUser, isLoggedIn } from './useLocalStorage';
import { LOGIN_URL, REGISTER_URL } from '../constants/apiUrl';

export default function useAuth() {
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
      saveUser(data.name);
      setAuth({
        isAuthenticated: true,
        user: data.name,
        token: data.accessToken
      });
    } else {
      throw new Error('Failed to login');
    }
  };

  const register = async (email, password, name, avatar, banner) => {
    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, avatar, banner })
        });
        const data = await response.json();

        if (response.ok) {
            // Save the received token, user info, avatar, and banner
            saveToken(data.accessToken);
            saveUser({ name: data.name, email: data.email, avatar: data.avatar, banner: data.banner });
            setAuth({
                isAuthenticated: true,
                user: { name: data.name, email: data.email, avatar: data.avatar, banner: data.banner },
                token: data.accessToken
            });
        } else {
            throw new Error(data.message || 'Failed to register');
        }
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};


  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setAuth({ isAuthenticated: false, user: null, token: null });
  };

  // Automatically log in user if token exists
  useEffect(() => {
    if (getToken()) {
      setAuth(prev => ({ ...prev, isAuthenticated: true, user: getUser(), token: getToken() }));
    }
  }, []);

  return { auth, login, logout, register };
}
