const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');


router.get('/estabelecimento/:id', avaliacaoController.listarAvaliacoesEstabelecimento)

module.exports = router;