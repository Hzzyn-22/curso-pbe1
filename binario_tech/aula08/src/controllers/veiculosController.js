const db = require('../database/connection');

const veiculosController = {
	ListarTodos: async (req, res) => {
		try{
			const veiculos = await db('veiculos').select('*');
			res.status(200).json(veiculos);
		}
		catch (erro) {
			res.status(500).json({ erro: "Erro ao consultar banco de dados." });
		}
	},
	
	criar: async (req, res) => {
		try {
			const { placa, montadora, modelo } = req.body;

	if (!placa || !montadora || !modelo) {
	return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."});
	}
	const [id] = await db('veiculos').insert({
		placa,
		montadora,
		modelo
	});
	
	const novoVeiculo = await 
db('veiculos').where('id', id).first();
			res.status(201).json(novoVeiculo);
		} catch (erro) {
			if (erro.message.includes('UNIQUE constraint failed')) {
				return res.status(409).json({ erro: "Ja existe um veiculo cadastrado com esta placa." });
			}
			res.status(500).json({ erro: "Erro ao inserir veiculo no banco de dados."});
		}
	const BuscarPorld = require('../database');
	const veicule = await db('veiculos').where({'id}).first()'});
		if (!veicule) {
			return res.status(201).json({ erro: "veiculo nao encontrado"});
		}
		return res.json(veicule);
	} catch (erro) {
		console.error(error);
		return res.satus(500).json({ erro: "Erro interno ao buscar o veiculo"});
	}
}

};

module.exports = veiculosController;
