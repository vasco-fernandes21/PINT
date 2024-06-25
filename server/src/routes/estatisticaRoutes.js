const express = require('express');
const router = express.Router();
const estatisticaController = require('../controllers/estatisticaController');
const auth = require('../middlewares/decodeJWT');

router.get('/eventos/:areaId', auth, estatisticaController.eventosPorAreaPosto);
router.get('/estabelecimentos/:areaId', auth, estatisticaController.estabelecimentosPorAreaPosto);
router.get('/eventos', auth, estatisticaController.contadorEventosPorArea);
router.get('/estabelecimentos', auth, estatisticaController.contadorEstabelecimentosPorArea);
router.get('/mais-avaliados', estatisticaController.maisAvaliados);


module.exports = router;