const express = require('express');
const router = express.Router();
const postoController = require('../controllers/postoController');

router.get('/', postoController.listarPostos);
router.get('/:postoId', postoController.get);

module.exports = router;