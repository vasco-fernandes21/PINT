const express = require('express');
const validator = require('validator');
const nodemailer = require('nodemailer');

// Import database connection
const db = require('./database');

const app = express.Router(); // Assuming use within Express app

// Função para gerar token (implement your logic)
function generateToken() {
  // ... (e.g., use a crypto library to generate a random string)
}

// Função para enviar email de verificação
async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    // ... configure your email transport
  });

  const mailOptions = {
    from: 'noreply@seuexemplo.com',
    to: email,
    subject: 'Verificação de conta',
    html: `<p>Clique no link para verificar sua conta: <a href="${process.env.BASE_URL}/verificar-conta/${token}">${process.env.BASE_URL}/verificar-conta/${token}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de verificação enviado com sucesso!');
  } catch (err) {
    console.error('Erro ao enviar email:', err);
    throw err; // Re-throw to handle error in calling function
  }
}

// Rota para criar conta
app.post('/criar-conta', async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;

  if (!validator.isEmail(email)) {
    return res.status(400).send('Email inválido');
  }

  if (senha.length < 8) {
    return res.status(400).send('Senha muito curta');
  }

  try {
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).send('Email já cadastrado');
    }

    const token = generateToken();
    const user = await db.createUser(nome, email, senha, token);

    await sendVerificationEmail(email, token);

    res.send('Conta criada com sucesso! Verifique seu email para ativar.');
  } catch (err) {
    console.error('Erro ao criar conta:', err);
    res.status(500).send('Erro ao criar conta');
  }
});

module.exports = app;
