require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const provaRoutes = require('./src/routes/provaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/prova', provaRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao conectar ao MongoDB:', erro);
  });

