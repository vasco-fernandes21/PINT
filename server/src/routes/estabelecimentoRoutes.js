const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');
const { uploadEstabelecimentos } = require('../config/multer');
const auth = require('../middlewares/decodeJWT');

router.get('/', auth, estabelecimentoController.listarEstabelecimentos);
router.get('/validar', auth, estabelecimentoController.EstabelecimentosPorValidar);
router.get('/mobile', estabelecimentoController.estabelecimentosMobile); 
router.put('/:id', uploadEstabelecimentos.single('foto'), estabelecimentoController.editarEstabelecimento);
router.get('/:id', estabelecimentoController.estabelecimento_id);
router.delete('/:id', estabelecimentoController.apagarEstabelecimento);
router.post('/', auth, uploadEstabelecimentos.single('foto'), estabelecimentoController.criarEstabelecimento);



module.exports = router;
