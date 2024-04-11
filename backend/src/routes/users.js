const express = require('express');
const router = express.Router();
const { sql, connect } = require('../utils/database'); // Import the sql module and connect function from database.js

/* GET all users. */
router.get('/', async function(req, res, next) {
  try {
    // Connect to the database
    await connect();

    const users = await sql.query`SELECT * FROM TABELA_UTILIZADOR`;

    res.send(users.recordset);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;