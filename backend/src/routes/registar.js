const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sql = require('mssql');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserir o novo usuário no banco de dados
  try {
    const pool = await sql.connect(/* your config */);
    await pool.request()
    .input('email', sql.NVarChar(255), email)
    .input('password', sql.NVarChar(255), hashedPassword)
    .input('NOME', sql.NVarChar(255), ' ') // valor padrão para NOME
    .query('INSERT INTO TABELA_UTILIZADOR (EMAIL, PALAVRA_PASSE, NOME) VALUES (@email, @password, @NOME)');

    res.send({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Erro ao registrar o usuário' });
  }
});

module.exports = router;