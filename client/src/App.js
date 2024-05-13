import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/loginForm';
import Registar from './components/login/registarForm';
import Sidebar from './view/sidebar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="*" element={<Navigate to="/login" />} />  
        <Route path='/sidebar' element={<Sidebar />} />  
      </Routes>
    </Router>
  );
}

export default App;