const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sql, connect } = require('../utils/database'); // Import database connection

// Função para realizar o login
async function login(req, res) {
  try {
    // Connect to the database
    await connect();

    const { email, password } = req.body;

    // Validate missing email or password
    if (!email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    // Query for user by email
    const user = await sql.query`SELECT * FROM TABELA_UTILIZADOR WHERE EMAIL = ${email}`;

    // Check if user exists
    if (!user.recordset.length) {
      return res.status(401).send({ error: 'Utilizador não encontrado' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.recordset[0].PALAVRA_PASSE);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Senha incorreta' });
    }
    console.log('User record:', user.recordset[0]);

    // Generate JWT token
    const token = jwt.sign({ id: user.recordset[0].ID_UTILIZADOR }, process.env.JWT_SECRET, {
      expiresIn: '1h', //adicionar rota do refresh do token
    });

    res.send({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
}

module.exports = { login }; // Export only the login function
