import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './view/auth/loginForm';
import Registar from './view/auth/registarForm';
import Home from './view/home/home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
