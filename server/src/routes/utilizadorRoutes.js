const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');
const auth = require('../middlewares/decodeJWT');
const avaliacaoController = require('../controllers/avaliacaoController');

router.get('/', auth, utilizadorController.getUtilizador);
router.get('/todos', utilizadorController.getUtilizadores);
router.get('/:id', utilizadorController.utilizadorPorId);
router.post('/', utilizadorController.criarUtilizador);
router.put('/:id', utilizadorController.atualizarUtilizador);
router.delete('/:id', utilizadorController.apagarUtilizador);
router.post('/associar-posto', auth, utilizadorController.associarPosto);

module.exports = router;
