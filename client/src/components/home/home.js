import React from "react";
import { Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar'; 
import './home.css'; 
import ListEventos from '../eventos/listEventos';

function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content ml-4" style={{marginLeft:"15px", marginTop:"15px"}}>
        <Routes>
          <Route path="eventos" element={<ListEventos />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default Home;