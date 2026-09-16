const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

//Banco de dados em memoria
let veiculos = [
	{ id: 1, placa: "ABC-1234", montadora: "Scania", modelo: "FH540", status: "INDISPONIVEL" },
	{ id: 2, placa: "XYZ-9076", montadora: "Mercedes-Benz", modelo: "Actros", status: "EM_ROTA" }
];

// 1. GET /api/v1/veiculos - Listar todos os veiculos (Suporta filtros por status query param)
app.get('/api/v1/veiculos', (req, res) => {
	const { status } = req.query;
	if (status) {
		const filtrados = veiculos.filter(v => v.status.toUpperCase() === status.toUpperCase());
	}
	return res.status(200).json(veiculos);
});


//2. /API/V1/VECULOS/:ID - buscar veiculos por id
app.get('/api/v1/veiculos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const veiculo = veiculos.find(v => v.id === id);
	if (!veiculo) {
		return res.status(404).json({ erro: "Veiculo nao encontrado na base de dados."})
	}
	res.status(200).json(veiculo);
});

//3. POST /api/v1/veiculos - Cadastrar novo veiculo (criacao)
app.post('/api/v1/veiculos', (req, res) => {
	const { placa, montadora, modelo } = req.body;
	if (!placa || !montadora || !modelo) {
		return res.status(400).json({ erro: "Campos 'placa', 'motadora' e 'modelo' sao obrigatorios" });
	}
	const novoVeiculo = {
		id: veiculos.length + 1,
		placa,
		montadora,
		modelo,
		status: "DISPONIVEL"
	};
veiculos.push(novoVeiculo);
res.status(201).json(novoVeiculo);
});

//4. PATCH /api/v1/veiculos/:id/status - Atualizar status do veiculo
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
	const id = parseInt(req.params.id);
	const { status } = req.body;
	const veiculo = veiculos.find(v => v.id == id);

	if (!veiculo) {
		return res.status(404).json({ error: "O campo 'status' e obrigatorio."});
		}
	if (!status) {
		return res.status(400).json({ error: "O campo 'status' e obrigatorio."});
	}

	veiculos.status = status.toUpperCase();
		res.status(200).json({ mensagem: "Status atualizado com sucesso!", veiculo});
	});

//5. DELETE /api/v1/veiculos/:id - Remover veiculo da frota
app.delete('/api/v1/veiculos/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = veiculos.findIndex(v => v.id === parseInt(id));
	if (index === -1) {
		return res.status(404).json({ erro: "Veiculo nao encontrado"});
	}
	veiculos.splice(index, 1);
	res.status(200).json({ mensagem: `Veiculo ID ${id} removido com sucesso.`
	});
});

app.listen(PORT, () => {
	console.log(`[binario tech] API de Frotas rodando em http://localhost:${PORT}`);
});

app.put('/api/v1/veiculos/:id', async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    const veiculo = await Veiculo.findByPk(id);
    if (!veiculo) return res.status(404).json({ erro: 'Veículo não encontrado' });
    await veiculo.update(dados);
    res.json(veiculo);
  } catch (err) {
    res.status(400).json({ erro: 'Dados inválidos' });
  }
});

