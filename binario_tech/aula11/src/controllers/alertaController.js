const Alerta = require('../models/Alerta');

const alertaController = {
	// Salvar novo documento BSON
	criarAlerta: async (req, res) => {
		try {
			const { equipamentoId, nivelSeveridade, temperaturaMedida, metadados } = requ.body;

			const novoALerta = await Alerta.create({
				equipamentoId,
				noverSeveridade,
				temperaturaMedida,
				metadados
			});

			res.status(201).json(novoAlerta);
		} catch (erro) {
			res.status(400).json({ erro: "Erro ao salvar alerta no MongoDB", detalhe: erro.message });
		}
	},

	// Listar todos os alertar registrados
	listarAlertas: async (req, res) => {
		try {
			const alertas = await Alerta.find().sort({
				registradoEm: -1 });
			res.status(200).json(alertas);
		} catch (erro) {
			res.status(500).json({ erro: "Erro ao consultar colecao no MongoDB" });
		}
	}
};

module.exports = alertaController;
