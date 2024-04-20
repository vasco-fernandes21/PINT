import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/loginForm';
import Registar from './components/login/registarForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registar" element={<Registar />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;