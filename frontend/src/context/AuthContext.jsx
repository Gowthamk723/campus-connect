import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); 
    }
    setLoading(false);
  }, []);

  // ✅ FIXED LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      // 1. Send JSON data to the correct endpoint
      const response = await api.post('/api/auth/login', { 
        email: email, 
        password: password 
      });
      
      // 2. Get the token from response
      const { access_token } = response.data;
      
      // 3. Save to Local Storage and State
      localStorage.setItem('token', access_token);
      setUser({ token: access_token });
      
      return true;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error; // Pass error to Login page to show "Invalid credentials"
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // ✅ FIXED REGISTER FUNCTION
  const register = async (userData) => {
    // Matches your Swagger: /api/auth/register
    await api.post('/api/auth/register', userData);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};