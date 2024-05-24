import React from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './sidebar'; 
import './home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Eventos from "../../views/eventos/evento";

function Home() {
  return (
      <div className="content ml-5" style={{marginTop:"30px"}}>
        <Routes>
          <Route path="eventos" element={<Eventos />} />
        </Routes>
      </div>
  );
}

export default Home;