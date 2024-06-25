import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/softinsa.svg';
import api from '../api/api';
import { Link } from 'react-router-dom';

const ContaConfirmada = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  console.log(token);

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const response = await api.post('/verificar-conta', { token });
        alert(response.data.message); 
      } catch (error) {
        console.error('Erro ao verificar email:', error);
        alert('Erro ao verificar email. Por favor, tente novamente.');
      }
    };

    if (token) verificarToken();
  }, [token]);


  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <header className="header mb-4">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="text-center">
        <h2>A verificar a sua conta...</h2>
        <p>Aguarde enquanto verificamos a sua conta...</p>
        <Link to="/login" className="btn btn-outline-success mt-2" id="botaoEntrar">
          IR PARA O LOGIN
        </Link>
      </div>
    </div>
  );
};

export default ContaConfirmada;
