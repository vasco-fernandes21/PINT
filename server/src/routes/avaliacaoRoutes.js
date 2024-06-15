const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');

router.post('/estabelecimento/criar/:id', avaliacaoController.CriarAvaliacaoEstabelecimento)
router.get('/estabelecimento/:id', avaliacaoController.listarAvaliacoesEstabelecimento)
router.put('/estabelecimento/:id', avaliacaoController.editarAvaliacaoEstabelecimento)

module.exports = router;