const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const registrarUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios'
      });
    }

    if (senha.length < 6) {
      return res.status(400).json({
        erro: 'A senha deve ter no mínimo 6 caracteres'
      });
    }

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: 'Usuário já cadastrado'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: {
        email: usuario.email,
        senha: usuario.senha
      }
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro interno do servidor'
    });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios'
      });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Email ou senha inválidos'
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m'
      }
    );

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario
};

