const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { uploadEventos } = require('../config/multer');
const auth = require('../middlewares/decodeJWT');

// /eventos


router.get('/', auth, eventoController.listarEventos);
router.get('/validar', auth, eventoController.listarEventos);
router.post('/', auth, uploadEventos.single('foto'), eventoController.CriarEvento);
router.delete('/:id', auth, eventoController.apagarEvento);
router.get('/:id', eventoController.getEvento);
router.put('/:id', uploadEventos.single('foto'), eventoController.editarEvento);
router.get('/:id/inscricao', eventoController.getInscricaoEvento);



module.exports = router;