const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const scaniaRoutes = require('./src/routes/scaniaRoutes');
const mercedesRoutes = require('./src/routes/mercedesRoutes');

app.get('/api/v1/telemetria', (req, res) => {
  res.status(200).json({
    servico: 'Telemetria Binario Tech',
    rotas: [
      '/api/v1/telemetria/scania',
      '/api/v1/telemetria/mercedes'
    ]
  });
});

app.use('/api/v1/telemetria/scania', scaniaRoutes);
app.use('/api/v1/telemetria/mercedes', mercedesRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Modulo ou rota de telemetria nao encontrada.' });
});

app.listen(PORT, () => {
  console.log(`[Binario Tech] Servidor modularizado ativo na porta ${PORT}`);
});

module.exports = app;
