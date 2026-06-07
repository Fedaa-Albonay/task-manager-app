import React from 'react';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'https://task-manager-app-backend-eq4c.onrender.com/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('taskflowUser')));

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('taskflowUser', JSON.stringify(data));
    setUser(data);
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    localStorage.setItem('taskflowUser', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('taskflowUser');
    setUser(null);
  };

  const authHeader = () => ({ headers: { Authorization: `Bearer ${user?.token}` } });

  return <AuthContext.Provider value={{ user, login, register, logout, authHeader, API_URL }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
