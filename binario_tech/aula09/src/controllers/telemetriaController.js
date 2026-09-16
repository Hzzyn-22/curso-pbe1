const db = require('../database/connection');

const telemetriaController = {
	// cadastrar nova leitura de telemetria associada a um veiculo
	registrarLeitura: async (req, res) => {
		try {
			const { veiculo_id, velocidade, temperatura_motir } = req.body;

			if (!veiculo_id || velocidade === undefined || temperatura_motor === undefined) {
				return res.status(400).json({ erro: "Campos 'veiculo_id', 'velocidade' e 'temperatura_motor' sao obigatorios." });
			}

			const veiculoExiste = await db('veiculos').where({ id: veiculo_id }).first();
			if (!veiculoExiste) {
				return res.status(404).json({ erro: "Veiculo informado nao existe no banco de dados." });
			}

			const[id] = await db('telemetria').insert({
				veiculo_id,
				velocidade,
				temeperatura_motor
			});

			res.status(201).json({ id, veiculo_id, velocidade, temperatura_motor, mensagem: "Leitura registrada com sucesso!" });
			} catch (erro) {
				res.status(500).json({ erro: "Erro ao registrar telemetria no banco de dados." });
			}
	},

	// Listar todas as leituras oom dados do veiculo (INNER JOIN)
	ListarRelatorioCompleto: async (req, res) => {
		try {
			const relatorio = await db('telemetria')
			.join('veiculos', 'veiculos.id', '=', 'telemetria.ceiculo_id')
			.select(
				'telemetria.id as telemetria_id'
				'veiculos.placa',
				'veiculos_montadora',
				'veiculos_modelo',
				'telemetria.velocidade',
				'telemetria.temperatura_motor',
				'temeletria.capturado_em'
			);
			
			res.status(200).json(relatorio);
		}catch (erro) {
			res.status(500).json({ erro: "Erro ao gerar relatorio com Inner Join." });
		}
	}
};

module.exports = telemetriaController;
