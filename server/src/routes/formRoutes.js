const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const auth = require('../middlewares/decodeJWT');


router.post('/:idEvento', auth, formController.criarFormulario);
router.get('/:idEvento', formController.getFormularioEvento);

module.exports = router;