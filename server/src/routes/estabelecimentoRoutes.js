const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');
const { uploadEstabelecimentos } = require('../config/multer');
const auth = require('../middlewares/decodeJWT');

router.get('/', auth, estabelecimentoController.listarEstabelecimentos);
router.get('/mobile', estabelecimentoController.estabelecimentosMobile); 
router.put('/:id', uploadEstabelecimentos.single('foto'), estabelecimentoController.editar);
router.get('/:id', estabelecimentoController.estabelecimento_id);
router.delete('/:id', estabelecimentoController.apagarEstabelecimento);
router.post('/criar', auth, uploadEstabelecimentos.single('foto'), estabelecimentoController.create);


module.exports = router;
