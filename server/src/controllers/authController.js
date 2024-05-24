const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const Utilizador = require('../models/utilizadorModel');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();
function generateJWTToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

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
    console.log(typeof password, typeof user.palavra_passe);
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

    // Gere um token de verificação
    const verificationToken = crypto.randomBytes(32).toString('hex');

    await Utilizador.create({
      nome,
      email,
      palavra_passe: hashedPassword,
      verificationToken,
      estado: false
    });

    // Envie um email com o link de verificação
    const verificationUrl = `${process.env.REACT_APP_API_URL}/verify-email?token=${verificationToken}`;
    await sendEmail({
      email,
      subject: 'Verifique seu email',
      message: `Clique no link a seguir para verificar sua conta: ${verificationUrl}`
    });

    res.send({ message: 'Conta criada com sucesso. Verifique seu email para ativar sua conta.' });
  } catch (error) {
    console.error('Error during account creation:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.verificarEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await Utilizador.findOne({ where: { verificationToken: token } });
    if (!user) {
      return res.status(400).send({ error: 'Token de verificação inválido' });
    }

    user.estado = true;
    user.verificationToken = null;
    await user.save();

    res.send({ message: 'Email verificado com sucesso. Pode seguir para o login' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.enviarEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: 'Hello <hello@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(mailOptions);

    






exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token não fornecido' });
    }

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
