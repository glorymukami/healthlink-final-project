import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL } from '../config/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login API response:', data);

      // Handle successful login - FIXED VERSION
      if (response.ok) {
        // If response has token directly (your current backend format)
        if (data.token) {
          const userData = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
          };
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          
          console.log('Login successful, user:', userData);
          return { success: true, user: userData };
        }
        // If response has success field (expected format)
        else if (data.success) {
          const userData = data.user || data.data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return { success: true, user: userData };
        }
      }
      
      // If we get here, login failed
      return { 
        success: false, 
        message: data.message || 'Login failed' 
      };
      
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Network error occurred' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Handle successful registration - FIXED VERSION
      if (response.ok) {
        // If response has token directly
        if (data.token) {
          const userData = {
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
          };
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return { success: true, user: userData };
        }
        // If response has success field
        else if (data.success) {
          const userData = data.user || data.data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return { success: true, user: userData };
        }
      }
      
      return { 
        success: false, 
        message: data.message || 'Registration failed' 
      };
      
    } catch (error) {
      return { 
        success: false, 
        message: 'Network error occurred' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isPatient: user?.role === 'patient',
    isDoctor: user?.role === 'doctor',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};