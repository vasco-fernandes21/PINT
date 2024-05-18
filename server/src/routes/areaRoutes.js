const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.get('/', areaController.listarAreas);
router.get('/:areaId', areaController.listarSubareas);

module.exports = router;