const express = require('express');
const router = express.Router();
const NotificacaoController = require('../controllers/notificacaoController');
const auth = require('../middlewares/decodeJWT');

router.get('/', auth, NotificacaoController.getNotificacoes);
router.post('/', auth, NotificacaoController.criarNotificacao);
router.delete('/:id', auth, NotificacaoController.apagarNotificacao);
router.get('/contador', auth, NotificacaoController.contadorNotificacoes)

module.exports = router;