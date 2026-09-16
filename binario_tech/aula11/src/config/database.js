const mogoose = require('mongoose');

const conectarBanco = async () => {
	try {
		const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_nosql';
		await mongoose.connect(uri);
		console.log('[Binario Tech] Conexao com MongoDB estabelecida com sucesso!');
	} catch (erro) {
		console.error(`[ERRO MOGODB]:_Falha ao conectar ao banco - ${erro.message}`);
		process.exit(1);
	}
};

module.exports = conectarBanco;

