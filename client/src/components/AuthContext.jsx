import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'), // True if token exists in localStorage
  });

  // Login function to set token and update state
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthState({
      token,
      isAuthenticated: true,
    });
  };

  // Logout function to clear token and update state
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
  };

  // Function to check authentication status
  const isAuthenticated = () => authState.isAuthenticated;

  return (
    <AuthContext.Provider value={{ authState, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
