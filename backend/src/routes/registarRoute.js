const express = require('express');
const router = express.Router();
const RegistarController = require('../controllers/registarController');

router.post('/', RegistarController.criarConta);

module.exports = router;