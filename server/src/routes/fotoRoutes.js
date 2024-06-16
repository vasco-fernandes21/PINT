const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');
const eventoController = require('../controllers/eventoController');
const { uploadEstabelecimentos, uploadEventos} = require('../config/multer');


router.get('/estabelecimentos/:id', estabelecimentoController.getFotoEstabelecimento);
router.get('/eventos/:id', eventoController.getFotoEvento);
router.post('/estabelecimentos/:id', uploadEstabelecimentos.single('foto'), estabelecimentoController.uploadFoto);
router.delete('/estabelecimentos/:id', estabelecimentoController.deleteFoto);
router.post('/eventos/:id', uploadEventos.single('foto'), eventoController.uploadFoto);
router.delete('/eventos/:id', eventoController.deleteFoto);


module.exports = router;