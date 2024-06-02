const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { uploadEventos } = require('../config/multer');
const auth = require('../middlewares/decodeJWT');

router.get('/', auth, eventoController.listarEventos);
router.post('/criar', auth, uploadEventos.single('foto'), eventoController.create);
router.get('/naoverificados', auth, eventoController.porVerificar);
router.get('/naoverificados/count', auth, eventoController.countPorVerificar);

module.exports = router;