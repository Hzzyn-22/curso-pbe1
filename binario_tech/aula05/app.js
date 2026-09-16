const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const motoristasRouter = require('./routes/motoristas');

const app = express();
const PORT = 3000;
const manutencoesRouter = require('./routes/mantencoes');

app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);

//Middlewares globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

//Rota Publica
app.get('/api/v1/health', (req, res) => {
	res.status(200).json({ status: "ONLINE", aplicacao: "Binario tech API v2"});
});

//Rotas Protegidas por Autenticacao
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);

//MiddleWare global de tratamento de erros 404 (Rotas nao encontrada)
app.use((req, res) => {
	res.status(404).json({erro: "Endpoint nao encontrado ao servidor Binario Tech."});
});

// Middleware global de tratamento de erros (Exercício 08)
app.use((err, req, res, next) => {
  console.error("[ERRO GLOBAL]", err.stack);

  res.status(500).json({
    erro: "Erro interno no servidor Binario Tech.",
    detalhe: err.message
  });
});


app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de middlewares ativo na porta ${PORT}`);
});
