const express = require('express');
const scaniaController = require('../controllers/scaniaControllers');
const validaVin = require('../middlewares/validaVin');

const router = express.Router();

router.get('/', scaniaController.listarTelemetria);
router.post('/', validaVin, scaniaController.registrarTelemetria);

module.exports = router;
