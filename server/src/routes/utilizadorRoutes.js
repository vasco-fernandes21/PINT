const express = require('express');
const router = express.Router();
const auth = require('../middlewares/decodeJWT');
const utilizadorController = require('../controllers/utilizadorController');

router.get('/', auth, utilizadorController.getUtilizador);
router.get('/todos', auth, utilizadorController.getUtilizadores);
router.post('/associar-posto', utilizadorController.associarPosto);



module.exports = router;