const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');
const { uploadEstabelecimentos } = require('../config/multer'); 
const auth = require('../middlewares/decodeJWT');

router.get('/', auth, estabelecimentoController.listarEstabelecimentos);
router.post('/criar', auth, uploadEstabelecimentos.single('foto'), estabelecimentoController.create);

module.exports = router;