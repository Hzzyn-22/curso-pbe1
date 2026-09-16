
const express = require('express');
const router = express.Router();

let manutencoes = [
  { id: 1, descricao: "Troca de óleo", valor: 500 },
  { id: 2, descricao: "Revisão completa", valor: 1500 }
];

router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

router.post('/', (req, res) => {
  const { descricao, valor } = req.body;

  if (!descricao || !valor) {
    return res.status(400).json({ erro: "Campos 'descricao' e 'valor' são obrigatórios." });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);
  res.status(201).json(novaManutencao);
});

module.exports = router;

