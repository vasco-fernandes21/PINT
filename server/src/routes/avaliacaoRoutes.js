const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const auth = require('../middlewares/decodeJWT');

// /avaliacao
router.get('/estabelecimentos/:id', avaliacaoController.listarAvaliacoesEstabelecimento)
router.post('/estabelecimentos/criar/:id', avaliacaoController.CriarAvaliacaoEstabelecimento)
router.put('/estabelecimentos/:id', avaliacaoController.editarAvaliacaoEstabelecimento)
router.delete('/estabelecimentos/:id', avaliacaoController.apagarAvaliacaoEstabelecimento)

router.get('/eventos/:id', avaliacaoController.listarAvaliacoesEvento)
router.post('/eventos/criar/:id', avaliacaoController.CriarAvaliacaoEvento)
router.put('/eventos/:id', avaliacaoController.editarAvaliacaoEvento)
router.delete('/eventos/:id', avaliacaoController.apagarAvaliacaoEvento)

router.get('/utilizador/:idUtilizador', avaliacaoController.listarAvaliacoesUtilizador);

//validações
router.get('/validar/eventos', auth, avaliacaoController.AvaliacaoEventoPorValidar);
router.get('/validar/estabelecimentos', auth, avaliacaoController.AvaliacaoEstabelecimentoPorValidar);



module.exports = router;