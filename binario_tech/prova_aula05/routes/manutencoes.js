const express = require('express');
const router = express.Router();


const manutencoes = [
  { id: 1, caminhaoId: 1, descricao: 'Troca de oleo', valor: 850.00 }
];


router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});


router.post('/', (req, res) => {
  const { caminhaoId, descricao, valor } = req.body;


  if (!caminhaoId || !descricao || !valor) {
    return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
  }


  const novaManutencao = {
    id: manutencoes.length + 1,
    caminhaoId,
    descricao,
    valor
  };


  manutencoes.push(novaManutencao);
  res.status(201).json(novaManutencao);
});


module.exports = router;
