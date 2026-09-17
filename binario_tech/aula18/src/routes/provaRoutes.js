const express = require('express');

const {
  registrarUsuario,
  loginUsuario
} = require('../controllers/authController');

const validarJWT = require('../middlewares/validarJWT');

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/relatorio', validarJWT, (req, res) => {
  return res.status(200).json({
    mensagem: 'Acesso autorizado ao relatório',
    usuario: req.usuario
  });
});

module.exports = router;

