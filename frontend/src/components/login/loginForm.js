import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import logo from '../../assets/softinsa.svg';
import '../../styles/login.css';
import {GoogleLogin} from 'react-google-login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const token = response.data.token; // Assuming token is here
      console.log('Received token:', token); // Verify token presence
      localStorage.setItem('token', token);
      // Redirect to home page
      window.location.href = '/';
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
    setErrorMessage(''); // Clear any previous error message before submitting
    handleLogin(email, password);
  };

  const handleGoogleLogin = () => {
    const googleLogin = new GoogleLogin({
      clientId: "946771932227-a38o98q56j3dqaubcqk9pho47u76u89n.apps.googleusercontent.com",
      onSuccess: responseGoogle,
      onFailure: responseGoogle,
    });
  
    googleLogin.signIn();
  };

 const responseGoogle = (response) => {
  console.log(response);
  const token = response.tokenId; // O token do Google está disponível no campo tokenId da resposta

  // Enviar o token para o seu servidor
  axios.post('http://localhost:3000/google-login', { token })
    .then(res => {
      console.log(res.data);
      // Aqui você pode lidar com a resposta do seu servidor
      // Por exemplo, você pode armazenar o token JWT que o seu servidor retorna no localStorage
    })
    .catch(err => {
      console.error('Erro ao enviar o token para o servidor:', err);
    });
}

  return (
  <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{height:'65vh'}}>
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
          style={{backgroundColor: '#DCDCDC'}}
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
          style={{backgroundColor: '#DCDCDC'}}
        />
      </div>
      <div className="d-flex flex-column justify-content-between mb-3">
      <button type="submit" className="btn btn-outline-success" id='botaoEntrar'>
        ENTRAR
      </button>
      <button className="btn btn-outline-success mt-2" id='botaoEntrar'>
        CRIAR CONTA
      </button> 
      <hr/>
      <GoogleLogin
            clientId="946771932227-a38o98q56j3dqaubcqk9pho47u76u89n.apps.googleusercontent.com"
            buttonText="Login com Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}  
          />
    </div>
    <a href="#" className="text-muted mb-2 text-center" style={{ display: 'block', textAlign: 'center', fontSize:'13px'}}>
  Esqueceu a palavra-passe?
    </a>
    </form>
  </div>
);
}

export default Login;