const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

//Rota de Satus da Binario Tech
app.get('/status', (req, res) => {
	res.json({
		servidor: "Binario Tech Core",
		status: "OPERACIONAL", 
		montadoras__atendidas: ["Scania", "Mercedes" , "WW" ],
		uptime_segundos: process.uptime()
	});
});

//Rota de Informacoes da Montadora Scania
app.get('/Scania/info', (req, res) => {
	res.json({
		montadora: "Scania",
		foco: "Caminhoes Pesados e Ônibus",
		sistema_telemetria: "Ativo",
		unidades_conectadas: 1420
	});
});

app.listen(PORT, () => {
	console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
