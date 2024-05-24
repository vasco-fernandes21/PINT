import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import Home from './components/home/home';
import FileUpload from './components/teste';
import Sidebar from './components/home/sidebar';
import Eventos from './views/eventos/eventos';

const AuthenticatedLayout = () => (
  <>
    <Sidebar />
    <div style={{padding: '30px' }}> 
      <Outlet />
    </div>
  </>
);

const UnauthenticatedLayout = () => (
  <div>
    <Outlet />
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<UnauthenticatedLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registar" element={<Registar />} />
        </Route>

        <Route element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />}>
          <Route path="/" element={<Home />} />
          <Route path="/teste" element={<FileUpload />} />
          <Route path="/eventos" element={<Eventos />} />
        </Route>
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
