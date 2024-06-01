const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');
const { uploadEstabelecimentos } = require('../config/multer'); 

router.get('/', estabelecimentoController.listarEstabelecimentos);
router.post('/criar', uploadEstabelecimentos.single('foto'), estabelecimentoController.create);

module.exports = router;