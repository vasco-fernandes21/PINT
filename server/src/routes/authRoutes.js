const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/login/mobile', authController.loginMobile);
router.post('/registar', authController.criarConta);
router.post('/login/google', authController.google);
router.post('/verificar-conta', authController.verificarEmail);
router.post('/recuperar-passe', authController.recuperarPasse);
router.post('/reset-passe', authController.resetarPasse);

module.exports = router;


