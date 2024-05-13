const bcrypt = require('bcryptjs');
require('dotenv').config();
const Utilizador = require('../models/utilizadorModel');

exports.criarConta = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    const user = await Utilizador.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({ error: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Utilizador.create({ email, palavra_passe: hashedPassword });

    res.send({ message: 'Conta criada com sucesso' });
  } catch (error) {
    console.error('Error during account creation:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};