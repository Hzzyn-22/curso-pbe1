module.exports = (req, res, next) => {
  const { cnh } = req.body;
  const regex = /^[0-9]{11}$/;
  if (!regex.test(cnh)) {
    return res.status(400).json({ erro: 'CNH inválida. Deve conter 11 dígitos numéricos.' });
  }
  next();
};

