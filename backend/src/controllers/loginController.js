const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { pool } = require('../utils/database');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password)

    if (!email || !password) {
      return res.status(400).send({ error: 'Preencha todos os campos' });
    }

    const user = await pool.query('SELECT * FROM TABELA_UTILIZADOR WHERE EMAIL = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).send({ error: 'Utilizador não encontrado' });
    }
    console.log(user.rows[0].palavra_passe)
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].palavra_passe);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.rows[0].ID_UTILIZADOR }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.send({ message: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
};