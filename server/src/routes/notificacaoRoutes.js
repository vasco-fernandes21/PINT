const express = require('express');
const router = express.Router();
const NotificacaoController = require('../controllers/notificacaoController');
const auth = require('../middlewares/decodeJWT');

router.get('/:id', auth, NotificacaoController.NotificacoesId);
router.get('/', auth, NotificacaoController.Notificacoes);

module.exports = router;