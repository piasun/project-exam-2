import { useEffect, useState } from 'react';
import { LOGIN_URL, REGISTER_URL } from '../constants/apiUrl';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);
  const [error, setError] = useState(null);

  const isAuthenticated = !!token;

  const login = async (email, password) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.accessToken);
        setUser(data.user);
      } else {
        throw new Error(data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed due to unexpected error');
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
        setToken(data.accessToken);
        setUser({ name: data.name, email: data.email, avatar: data.avatar, banner: data.banner });
      } else {
        throw new Error(data.message || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed due to unexpected error');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
  };

  useEffect(() => {
    // Here we could potentially handle token refresh or re-authentication if needed
  }, [token, user]);

  return { token, user, isAuthenticated, error, login, logout, register };
}


export default useAuth;
