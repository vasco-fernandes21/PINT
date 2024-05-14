import React from "react";
import Sidebar from './sidebar'; 
import './home.css'; 

function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content ml-2">
        <h2>Próximos eventos</h2>
      </div>
    </div>
  );
}

export default Home;