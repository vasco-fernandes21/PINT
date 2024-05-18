import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/softinsa.svg';
import './login.css';
import Swal from 'sweetalert2';
import GoogleAuth from './googleAuth';

function Login() {  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const token = response.data.token; 
      console.log('Received token:', token); 
      localStorage.setItem('token', token);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso',
        icon: 'success',
        confirmButtonColor: '#1D324F',
        willClose: () => {
          navigate('/');
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
      // Handle specific errors based on status code (if available)
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            setErrorMessage('Preencha todos os campos.');
            break;
          case 401:
            setErrorMessage(data.error || 'Email ou senha incorretos.');
            break;
          case 500:
            setErrorMessage('Erro interno do servidor. Tente novamente mais tarde.');
            break;
          default:
            setErrorMessage('Erro desconhecido.');
        }
      } else {
        setErrorMessage('Erro de rede. Verifique sua conexão.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); 
    handleLogin(email, password);
  };

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{ height: '75vh' }}>
      <header className="header mb-1">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nome de Utilizador"
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Palavra-passe"
            style={{ backgroundColor: '#DCDCDC' }}
          />
        </div>
        <div className="d-flex flex-column justify-content-between mb-3">
          <button type="submit" className="btn btn-outline-success" id='botaoEntrar'>
            ENTRAR
          </button>
          <Link to="/registar" className="btn btn-outline-success mt-2" id='botaoEntrar'>
            CRIAR CONTA
          </Link>
          <div className="form-group mb-0 mt-2">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="acceptTerms" style={{ marginLeft: '6px' }}>Aceito os termos e condições</label>
          </div>
          <div className="form-group mb-0">
            <input
              type="checkbox"
              id="rememberUser"
              name="rememberUser"
              checked={rememberUser}
              onChange={(e) => setRememberUser(e.target.checked)}
            />
            <label htmlFor="rememberUser" style={{ marginLeft: '6px' }}>Lembrar de mim</label>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center">
            <GoogleAuth />
        <button
          onClick={() => navigate('/esqueceu-senha')}
          className="btn btn-link text-muted mb-2 text-center"
          style={{ display: 'block', textAlign: 'center', fontSize: '13px' }}
        >
          Esqueceu a palavra-passe?
        </button>
        </div>
        </div>
      </form>
      {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
    </div>
  );
}

export default Login;
