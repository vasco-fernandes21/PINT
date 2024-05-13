const express = require('express');
const router = express.Router();
const RegistarController = require('../../controllers/authController');

router.post('/', RegistarController.criarConta);

module.exports = router;