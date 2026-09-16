const express = require('express');
const mercedesController = require('../controllers/mercedesController');

const router = express.Router();

router.get('/', mercedesController.listarFrota);
router.post('/', mercedesController.registrarCaminhao);

module.exports = router;
