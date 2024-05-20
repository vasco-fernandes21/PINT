const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');

router.get('/', estabelecimentoController.listarEstabelecimentos);

module.exports = router;