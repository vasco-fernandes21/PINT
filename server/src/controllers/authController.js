  const bcrypt = require('bcryptjs');
  const crypto = require('crypto');
  const jwt = require('jsonwebtoken');
  const { OAuth2Client } = require('google-auth-library');
  const nodemailer = require('nodemailer');
  const Utilizador = require('../models/utilizadorModel');
  const { info } = require('console');
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  require('dotenv').config();

  function generateJWTToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  const emailOptions = {
    email: 'vasconascimentofernandes@gmail.com',
    subject: 'Teste',
    message: 'Isto é um teste'
  };

  exports.listar_utilizadores = async (req, res) => {
    try {
      const utilizadores = await Utilizador.findAll();
      res.send(utilizadores);
    } catch (error) {
      console.error('Erro ao listar utilizadores:', error);
      res.status(500).send({ error: 'Erro interno do servidor' });
    }
  };


  exports.loginMobile = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    const user = await Utilizador.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ error: 'Utilizador não encontrado' });
    }

    if (isAdmin && !user.isAdmin) {
      return res.status(401).send({ error: 'Acesso negado' });
    }

    // Verificar se a conta do usuário foi verificada
    if (!user.estado) {
      return res.status(401).send({ error: 'Conta não verificada. Verifique o seu email para ativar a sua conta.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.palavra_passe);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Palavra Passe incorreta' });
    }

    const token = jwt.sign({ id: user.id, nome: user.nome}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Se isPrimeiroLogin for verdadeiro, gere um recoveryToken
    if (user.isPrimeiroLogin) {
      const recoveryToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Atualizar o recoveryToken no registro do usuário
      await user.update({ recoveryToken, isPrimeiroLogin: false });
    }

    res.send({ message: 'Login realizado com sucesso', token, recoveryToken: user.recoveryToken });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    const user = await Utilizador.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ error: 'Utilizador não encontrado' });
    }

    // Verificar se o usuário é um administrador
    if (!user.isAdmin) {
      return res.status(401).send({ error: 'Acesso negado' });
    }

    // Verificar se a conta do usuário foi verificada
    if (!user.estado) {
      return res.status(401).send({ error: 'Conta não verificada. Verifique o seu email para ativar a sua conta.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.palavra_passe);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Palavra Passe incorreta' });
    }

    const token = jwt.sign({ id: user.id, idPosto: user.idPosto}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Se isPrimeiroLogin for verdadeiro, gere um recoveryToken
    if (user.isPrimeiroLogin) {
      const recoveryToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Atualizar o recoveryToken no registro do usuário
      await user.update({ recoveryToken, isPrimeiroLogin: false });
    }

    res.send({ message: 'Login realizado com sucesso', token, recoveryToken: user.recoveryToken });
  } catch (error) {
    console.error('Erro durante o login:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};
  
    
  exports.criarConta = async (req, res) => {
    try {
      const { nome, email } = req.body;
  
      if (!nome || !email) {
        return res.status(400).send({ error: 'Preencha todos os campos' });
      }
  
      const user = await Utilizador.findOne({ where: { email } });
      if (user) {
        return res.status(400).send({ error: 'Email já está em uso' });
      }
  
      // Generate a random password
      const password = crypto.randomBytes(10).toString('hex');
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const verificationToken = crypto.randomBytes(32).toString('hex');
   
      await Utilizador.create({
        nome,
        email,
        palavra_passe: hashedPassword,
        verificationToken,
        estado: false
      });
  
      const verificationUrl = `${process.env.REACT_APP_API_URL}/verificar-conta?token=${verificationToken}`;
      await this.enviarEmail({  
        email,
        subject: 'Verifique o seu email',
        message: `Clique no link a seguir para verificar a sua conta: ${verificationUrl}. A sua password temporária é: ${password}`
      });
  
      res.status(201).send({ message: 'Conta criada com sucesso. Verifique o seu email para ativar sua conta.' });
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

  exports.recuperarPasse = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Utilizador.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: 'Utilizador não encontrado' });
    }

    const recoveryToken = crypto.randomBytes(32).toString('hex');
    user.recoveryToken = recoveryToken; 
    await user.save();

    const resetUrl = `${process.env.REACT_APP_FRONTEND}/reset-passe?token=${recoveryToken}`;
    await this.enviarEmail({
      email,
      subject: 'Recuperação de Palavra Passe',
      message: `Clique no link a seguir para redefinir a sua palavra-passe: ${resetUrl}`
    });

    res.send({ message: 'Email enviado com sucesso. Verifique a sua caixa de entrada' });
  } catch (error) {
    console.error('Error during password recovery:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
}

exports.resetarPasse = async (req, res) => {
  try {
    const { token, novaPass } = req.body;

    const user = await Utilizador.findOne({ where: { recoveryToken: token } });
    if (!user) {
      return res.status(400).send({ error: 'Token inválido' });
    }
    user.isPrimeiroLogin = false;
    await user.save();

    const hashedPassword = await bcrypt.hash(novaPass, 12);
    user.palavra_passe = hashedPassword;
    user.recoveryToken = null;
    await user.save();

    res.send({ message: 'A sua password foi redefinida com sucesso' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
}

  exports.enviarEmail = async (options) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: 'The Softshares <thesoftshares@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email enviado');
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao enviar email');
    }
  };


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
