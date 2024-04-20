const express = require('express');
const router = express.Router();

const pool = require('../utils/database'); 

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT ID_UTILIZADOR, NOME FROM TABELA_UTILIZADOR');
    res.send(result.rows);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;