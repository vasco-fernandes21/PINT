const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/registar', authController.criarConta);
router.post('/login/google', authController.googleLogin);
router.get('/verificar-conta', authController.verificarEmail);



module.exports = router;
