import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import Home from './components/home/home';
import FileUpload from './components/teste';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
        <Route path="/*" element={<Home />} />
        <Route path="/teste" element={<FileUpload />} />
      </Routes>
    </Router>
  );
}

export default App;