import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import Home from './components/home/home';

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
        <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;