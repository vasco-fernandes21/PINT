import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/softinsa.svg';
import './login.css';
import Swal from 'sweetalert2';
import GoogleAuth from './googleauth';
import api from '../api/api';
import Termos from './termos';

function Login({ setIsAuthenticated: setAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termos, setTermos] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    if (token) {
      setAuth(true);
      navigate('/');
    } else {
      setAcceptTerms(false);
    }
  }, [token, navigate, setAuth]);

  const handleLogin = async (email, password) => {
    let loginSuccessful = false;
    try {
      const response = await api.post('/login', { email, password });
      const { token, recoveryToken } = response.data;

      if (rememberUser) {
        localStorage.setItem('token', token);
        if (recoveryToken) {
          localStorage.setItem('recoveryToken', recoveryToken);
        }
      } else {
        sessionStorage.setItem('token', token);
        if (recoveryToken) {
          sessionStorage.setItem('recoveryToken', recoveryToken);
        }
      }

      setToken(token);
      loginSuccessful = true;
      Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso',
        icon: 'success',
        confirmButtonColor: '#1D324F',
        timer: 2000,
      });
      if (recoveryToken) {
        navigate(`/reset-passe?token=${recoveryToken}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            setIsEmailInvalid(true);
            setIsPasswordInvalid(true);
            setEmailError('Preencha todos os campos.');
            setPasswordError('Preencha todos os campos.');
            break;
          case 401:
            if (data.error === 'Conta não verificada. Verifique o seu email para ativar a sua conta.') {
              Swal.fire({
                title: 'Erro!',
                text: data.error,
                icon: 'error',
                confirmButtonColor: '#1D324F',
              });
            } else if (data.error === 'Utilizador não encontrado') {
              setIsEmailInvalid(true);
              setIsPasswordInvalid(false);
              setEmailError(data.error);
              setPasswordError('');
            } else if (data.error === 'Acesso negado') {
              Swal.fire({
                title: 'Erro!',
                text: 'Login apenas permitido a administradores.',
                icon: 'error',
                confirmButtonColor: '#1D324F',
              });
            } else {
              setIsEmailInvalid(false);
              setIsPasswordInvalid(true);
              setEmailError('');
              setPasswordError(data.error || 'Email ou senha incorretos.');
            }
            break;
          case 500:
            setIsEmailInvalid(false);
            setIsPasswordInvalid(false);
            setEmailError('');
            setPasswordError('');
            break;
          default:
            setIsEmailInvalid(false);
            setIsPasswordInvalid(false);
            setEmailError('');
            setPasswordError('');
        }
      } else {
        setIsEmailInvalid(false);
        setIsPasswordInvalid(false);
        setEmailError('');
        setPasswordError('');
      }
    }
    if (loginSuccessful) {
      setAuth(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptTerms) {
      Swal.fire({
        title: 'Erro!',
        text: 'Você deve aceitar os termos e condições para continuar.',
        icon: 'error',
        confirmButtonColor: '#1D324F',
      });
      return;
    }

    handleLogin(email, password);
  };

  const handleTermosOpen = () => {
    setTermos(true);
  };

  const handleTermosClose = () => {
    setTermos(false);
  };

  const handleTermosAccept = () => {
    setAcceptTerms(true);
  };

  const handleTermosReject = () => {
    setAcceptTerms(false);
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
            className={`form-control ${isEmailInvalid ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            required
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailInvalid(false);
              setEmailError('');
            }}
            placeholder="Email"
            style={{ backgroundColor: '#DCDCDC' }}
          />
          {isEmailInvalid && <div className="invalid-feedback">{emailError}</div>}
        </div>
        <div className="form-group">
          <input
            type="password"
            className={`form-control ${isPasswordInvalid ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordInvalid(false);
              setPasswordError('');
            }}
            placeholder="Palavra-passe"
            style={{ backgroundColor: '#DCDCDC' }}
          />
          {isPasswordInvalid && <div className="invalid-feedback">{passwordError}</div>}
        </div>
        <div className="d-flex flex-column justify-content-between mb-3">
          <button type="submit" className="btn btn-outline-success" id="botaoEntrar">
            ENTRAR
          </button>
          <Link to="/registar" className="btn btn-outline-success mt-2" id="botaoEntrar">
            CRIAR CONTA
          </Link>
          <div className="form-group mb-0 mt-2">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptTerms}
              disabled
            />
            <label htmlFor="acceptTerms" style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={handleTermosOpen}>
            Aceito os termos e condições
            </label>
          </div>
          <div className="form-group mb-0">
            <input
              type="checkbox"
              id="rememberUser"
              name="rememberUser"
              checked={rememberUser}
              onChange={(e) => setRememberUser(e.target.checked)}
            />
            <label htmlFor="rememberUser" style={{ marginLeft: '6px' }}>Manter sessão iniciada</label>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center">
            <GoogleAuth />
            <Link
              to="/recuperar-passe"
              className="btn btn-link text-muted mb-2 text-center"
              style={{ display: 'block', textAlign: 'center', fontSize: '13px' }}>
              Esqueceu a palavra-passe?
            </Link>
          </div>
        </div>
      </form>
      <Termos open={termos} handleClose={handleTermosClose} onAccept={handleTermosAccept} onReject={handleTermosReject} />
    </div>
  );
}

export default Login;

