import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import logo from '../../assets/softinsa.svg';
import './login.css';
import Swal from 'sweetalert2';

function RegistarForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegistar = async () => {
  try {
    const response = await api.post('/registar', {
      nome,
      email,
      password,
      confirmPassword,
    });

    if (response.data.success) {
      console.log('Conta criada com sucesso:', response.data);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Conta criada com sucesso',
        icon: 'success',
        confirmButtonColor: '#1D324F',
        willClose: () => {
          // Redirecionar para a página inicial quando o alerta for fechado
          navigate('/login');
        },
      });
    } else {
      console.error('Erro ao registar:', response.data.message);
      setErrorMessage(response.data.message);
    }
  } catch (error) {
    console.error('Erro ao registar:', error);
    Swal.fire({
      title: 'Erro!',
      text: 'Erro ao registar. Por favor, tente novamente.',
      icon: 'error',
      confirmButtonColor: '#1D324F',
    });
    setErrorMessage('Erro ao registar. Por favor, tente novamente.');
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  setErrorMessage('');

  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Erro!',
      text: 'As palavras-passe não coincidem.',
      icon: 'error',
      confirmButtonColor: '#1D324F',
    });
    setErrorMessage('As palavras-passe não coincidem.');
    return;
  }

  handleRegistar();
};

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{ height: '62vh' }}>
      <header className="header mb-1">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            required
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Palavra-passe"
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a palavra-passe"
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
        <button className="btn btn-outline-success mt-2" id='botaoEntrar'>
        CRIAR CONTA
      </button> 
      <Link to="/login" className="btn btn-outline-success mt-2" id='botaoEntrar'>
        CANCELAR
      </Link>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default RegistarForm;