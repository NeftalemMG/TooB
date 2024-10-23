import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add debug logging for user state changes
  useEffect(() => {
    console.log('AuthContext user state changed:', user);
  }, [user]);

  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token');
    console.log('Checking login with token:', token);
    if (token) {
      try {
        const res = await axios.get('/auth/me');
        console.log('Auth check response:', res.data);
        setUser(res.data);
      } catch (error) {
        console.error('Error checking user login:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const res = await axios.post('/auth/login', { email, password });
      console.log('Login response:', res.data);
      
      if (res.data.user && res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
      } else {
        throw new Error('Invalid response format');
      }
      
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout');
      await axios.post('/auth/logout');
      localStorage.removeItem('token');
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token and user state even if the server request fails
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  // Initial auth check
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
    checkUserLoggedIn // Export this to allow manual refresh
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};