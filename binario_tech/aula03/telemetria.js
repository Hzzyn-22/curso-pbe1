const express  = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

//Rota Scania
app.get('/api/v1/scania', (reg, res) => {
	res.json({montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82});
});

//rota Merceds-Benz
app.get('/api/v1/mercedes', (reg, res) => {
	res. json({montadora: "Mercedes-Benz", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78});
});

//rota Volkswagen
app.get('/api/v1/vw', (req, res) => {
	res.json({montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, vleidade_media: 0 });
});

app.get('/vw/info', (req, res) => {
  res.json({
    montadora: "Volkswagen",
    modelo: "Delivery",
    sistema_telemetria: "Ativo",
    status: "OK"
  });
});

//rota Volvo
app.get('/api/v1/volvo', (req, res) => {
	res.json({montadora: "Volvo", modelo: "FH540", status: "OK", conexao: true, velocidade_media: 89});
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de Tecnologia rodando em http://localhost:${PORT}`)
	});

