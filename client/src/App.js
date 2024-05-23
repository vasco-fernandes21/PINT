import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/loginForm';
import Registar from './components/auth/registarForm';
import Sidebar from './components/sidebar';
import '../src/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registar" element={<Registar />} />
      <div  className="home-container">
      <Sidebar />
        <div className="content ml-4" style={{marginLeft:"15px", marginTop:"30px"}}>
          <Route path="eventos" element={<ListEventos />} />
         </div>
      </div>
      </Routes>
    </Router>
  );
}

export default App;