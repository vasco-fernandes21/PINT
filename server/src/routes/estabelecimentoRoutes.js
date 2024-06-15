const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');
const { uploadEstabelecimentos } = require('../config/multer'); 
const auth = require('../middlewares/decodeJWT');

router.get('/', auth, estabelecimentoController.listarEstabelecimentos);
router.get('/:id', estabelecimentoController.estabelecimento_id);
router.get('/mobile', estabelecimentoController.estabelecimentosMobile);
router.post('/criar', auth, uploadEstabelecimentos.single('foto'), estabelecimentoController.create);
router.get('/:id/fotos', estabelecimentoController.getFotoEstabelecimento);

module.exports = router;