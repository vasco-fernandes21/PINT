import React from "react";
import { Route, Routes} from 'react-router-dom';
import './home.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Eventos from "../../views/eventos/eventos";

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