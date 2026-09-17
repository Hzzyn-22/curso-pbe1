const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Token não informado'
    });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(403).json({
      erro: 'Token inválido'
    });
  }

  const token = partes[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded;

    next();
  } catch (erro) {
    return res.status(403).json({
      erro: 'Token inválido'
    });
  }
};

module.exports = validarJWT;

