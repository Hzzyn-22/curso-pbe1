const telemetriaScania = [
  { id: 1, modelo: 'R540', vin: '9BS555444333', temperatura_motor: 88, status: 'NORMAL' },
  { id: 2, modelo: 'S500', vin: '9BS987654321', temperatura_motor: 102, status: 'ALERTA_AQUECIMENTO' }
];

const scaniaController = {
  listarTelemetria(req, res) {
    return res.status(200).json({ montadora: 'Scania', dados: telemetriaScania });
  },

  registrarTelemetria(req, res) {
    const { modelo, vin, temperatura_motor } = req.body || {};
    if (!modelo || !vin || temperatura_motor === undefined) {
      return res.status(400).json({ erro: "Campos 'modelo', 'vin' e 'temperatura_motor' são obrigatórios." });
    }

    const registro = {
      id: telemetriaScania.length ? Math.max(...telemetriaScania.map(item => item.id)) + 1 : 1,
      modelo,
      vin,
      temperatura_motor: Number(temperatura_motor),
      status: Number(temperatura_motor) > 100 ? 'ALERTA_AQUECIMENTO' : 'NORMAL'
    };
    telemetriaScania.push(registro);
    return res.status(201).json({ mensagem: 'Telemetria Scania registrada com sucesso.', dados: registro });
  }
};

module.exports = scaniaController;
