import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../assets/softinsa.svg';

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

return (
  <div className="container mt-5">
    <div className="wrapper d-flex align-items-center justify-content-center" style={{ height: "30vh", width: "30vw"}}>
      <div className="card mt-5" style={{ margin: '10 auto' }}>
    <div className="header-image">
  {/* Adicione o seu logo aqui */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
    </div>  </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div data-mdb-input-init className="form-outline mb-4">
          <label htmlFor="email">E-Mail</label>
          <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
          </div>
          <div className="textarea-container">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type="password"
                className="form-control shadow-none"
                name="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-wrapper">
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-outline-success"
                style={{ marginBottom: "10px" }}
              >
                <span className="bi bi-check-lg"> Entrar</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  
);
}

export default Login;