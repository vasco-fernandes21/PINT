const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { uploadEventos } = require('../config/multer');

router.get('/', eventoController.listarEventos);
router.post('/criar', uploadEventos.single('foto'), eventoController.create);

module.exports = router;