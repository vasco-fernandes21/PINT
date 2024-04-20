const bcrypt = require('bcryptjs');
require('dotenv').config();
const { pool } = require('../utils/database');

exports.criarConta = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    const user = await pool.query('SELECT * FROM TABELA_UTILIZADOR WHERE EMAIL = $1', [email]);
    if (user.rows.length > 0) {
      return res.status(400).send({ error: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO TABELA_UTILIZADOR (EMAIL, PALAVRA_PASSE) VALUES ($1, $2)', [email, hashedPassword]);

    res.send({ message: 'Conta criada com sucesso' });
  } catch (error) {
    console.error('Error during account creation:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};