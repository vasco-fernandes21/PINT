import React, { useState } from 'react';
import axios from 'axios';

function CriarContaForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleCriarConta = async (nome, email, senha) => {
    try {
      const response = await axios.post('http://localhost:3000/criar-conta', { nome, email, senha });
      console.log('Conta criada com sucesso! Verifique seu email para ativar.');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      if (error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Erro de rede. Verifique sua conexão.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message before submitting
    handleCriarConta(nome, email, senha);
  };

  return (
    <form onSubmit={handleSubmit} className="criar-conta-form">
      <div className="header mb-3">
        <img src={logo} alt="Logo" className="logo"/>  </div>
      <div className="form-group">
        <label htmlFor="nome">Nome de Usuário</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome de Usuário"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="senha">Palavra-passe</label>
        <input
          type="password"
          className="form-control"
          id="senha"
          name="senha"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Palavra-passe"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Criar Conta
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default CriarContaForm;