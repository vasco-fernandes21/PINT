import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/softinsa.svg'; // Import the logo
import api from '../api/api';

function SelectPosto() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postos, setPostos] = useState([]);
  const [selectedPosto, setSelectedPosto] = useState('');

  useEffect(() => {
    const fetchPostos = async () => {
      try {
        const response = await api.get('/postos');
        setPostos(response.data);
      } catch (error) {
        console.error('Error fetching postos:', error);
      }
    };

    fetchPostos();
  }, []);

const handlePostoSelection = async () => {
    try {
        const userResponse = await api.post('/utilizador');
        const userId = userResponse.data.id;
        const response = await api.post('/associarPosto', { idUtilizador: userId, idPosto: selectedPosto });
        
        navigate('/');
    } catch (error) {
        console.error('Error associating posto:', error);
    }
};

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{ height: '75vh' }}>
      <header className="header mb-1">
        <img src={logo} alt="Logo" className="logo" /> {/* Display the logo */}
      </header>
      <h1>Selecione um Posto</h1>
      <select value={selectedPosto} onChange={(e) => setSelectedPosto(e.target.value)}>
        {postos.map((posto) => (
          <option key={posto.id} value={posto.id}>
            {posto.name}
          </option>
        ))}
      </select>
      <button onClick={handlePostoSelection}>Confirmar</button>
    </div>
  );
}

export default SelectPosto;