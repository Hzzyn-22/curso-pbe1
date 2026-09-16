function validaVin(req, res, next) {
  const { vin } = req.body || {};
  if (typeof vin !== 'string' || vin.length !== 12) {
    return res.status(400).json({
      erro: 'VIN inválido: o código deve possuir exatamente 12 caracteres.'
    });
  }
  return next();
}

module.exports = validaVin;
