import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('currentUser');

    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      setUserRole(storedRole);
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  const login = (role, token, user) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentUser(user);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);