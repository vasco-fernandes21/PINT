import React from "react";
import Sidebar from './sidebar'; // Ajuste o caminho conforme necessário
import './Home.css'; // Importe o arquivo CSS

function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <h2>Próximos eventos</h2>
   
        {/* Restante do conteúdo */}
      </div>
    </div>
  );
}

export default Home;