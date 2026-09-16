const frotaMercedes = [
  { id: 1, modelo: 'Actros 2653', vin: 'WDB000000001', tipo: 'Actros', status: 'ATIVO' },
  { id: 2, modelo: 'Atego 2426', vin: 'WDB000000002', tipo: 'Atego', status: 'ATIVO' }
];

const mercedesController = {
  listarFrota(req, res) {
    return res.status(200).json({ montadora: 'Mercedes-Benz', dados: frotaMercedes });
  },

  registrarCaminhao(req, res) {
    const { modelo, vin, tipo, status = 'ATIVO' } = req.body || {};
    if (!modelo || !vin || !tipo) {
      return res.status(400).json({ erro: "Campos 'modelo', 'vin' e 'tipo' são obrigatórios." });
    }
    if (!['Actros', 'Atego'].includes(tipo)) {
      return res.status(400).json({ erro: "O campo 'tipo' deve ser 'Actros' ou 'Atego'." });
    }

    const registro = {
      id: frotaMercedes.length ? Math.max(...frotaMercedes.map(item => item.id)) + 1 : 1,
      modelo,
      vin,
      tipo,
      status
    };
    frotaMercedes.push(registro);
    return res.status(201).json({ mensagem: 'Caminhão Mercedes-Benz registrado com sucesso.', dados: registro });
  }
};

module.exports = mercedesController;
