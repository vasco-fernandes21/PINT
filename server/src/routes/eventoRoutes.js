const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/list', eventoController.list);

module.exports = router;