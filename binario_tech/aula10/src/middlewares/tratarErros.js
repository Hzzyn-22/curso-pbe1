function tratarErros(err, req, res, next) {
	console.error(`[EERO LOG]: ${err.menssage}`);

	if (err.message && err.message.includes('UNIQUE constraubt failed')) {
		return res.status(409).json({ erro: "Conflito de dados: Registro ja existe com este valor unico (ex: Placa)." });
	}


	if (err.message && err.message.includes('FOREIGN_KEY constraint failed')) {
		return res.status(400).json({ erro: "Erro de relacionamento: O registro pai fornecido nao existe." });
	}

	return res.status(500).json({ erro: "Erro interno no servidor da Binario Tech." });
}

module.exports = tratarErros;
