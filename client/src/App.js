import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import Home from './components/home/home';
import FileUpload from './components/teste';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      setIsAuthenticated(!!token);
    };

    checkAuthentication();

    // Add an event listener for local storage changes
    window.addEventListener('storage', checkAuthentication);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/teste" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;