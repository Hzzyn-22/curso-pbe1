const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');

router.get('/', veiculosController.ListarTodos);
router.post('/', veiculosController.criar);

module.exports = router;


