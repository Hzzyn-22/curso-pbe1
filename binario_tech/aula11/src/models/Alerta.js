const mongoose = require ('mongoose');

const AlertaSchema = new mongoose.Schema({
	equipamentoId: {
		type: String,
		required: [true, 'O ID do equipamento e obrigatorio']
	},
	nivelSeveridade: {
		type: String,
		enum: ['BAIXO', 'MEDIO', 'CRITICO'],
		default: 'MEDIO'
	},
	temperaturaMedida: {
		type: Number,
		required: true
	},
	metadados: {
		type: Map,
		of: String
	},
	registradoEm: {
		type: Date,
		default: Date.now
	},

}, {
	timestamps: true
});

module.exports = mongoose.model('ALERTA', AlertaSchema);

