const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Utilizador = require('../models/utilizadorModel');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('A verificar se o email e a senha foram fornecidos...');
    if (!email || !password) {
      console.log('Email ou senha não fornecidos');
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    console.log('A procurar o utilizador...');
    const user = await Utilizador.findOne({ where: { email } });

    if (!user) {
      console.log('utilizador não encontrado');
      return res.status(401).send({ error: 'Utilizador não encontrado' });
    }

    console.log('A verificar a password...');
    const isPasswordValid = await bcrypt.compare(password, user.palavra_passe);
    if (!isPasswordValid) {
      console.log('Senha incorreta');
      return res.status(401).send({ error: 'Senha incorreta' });
    }

    console.log('A gerar token...');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login realizado com sucesso');
    console.log(`ID do utilizador: ${user.id}`);
    console.log(`Email do utilizador: ${user.email}`);
    res.send({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};
  

exports.criarConta = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    const user = await Utilizador.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({ error: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Utilizador.create({ nome, email, palavra_passe: hashedPassword });

    res.send({ message: 'Conta criada com sucesso' });
  } catch (error) {
    console.error('Error during account creation:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log('token recebido no backend', token);
    console.log('corpo da requisição', req.body);

    if (!token) {
      return res.status(400).json({ error: 'Token não fornecido' });
    }

    console.log('token', token);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];

    const jwtToken = generateJWTToken(userId);
    res.json({ token: jwtToken });
  } catch (error) {
    console.error('Erro ao autenticar com Google:', error);
    res.status(500).json({ error: 'Erro ao autenticar com Google' });
  }
};
