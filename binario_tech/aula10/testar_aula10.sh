#!/bin/bash
echo "=========================================================================="
echo "            AUDITORIA DE SEEDS E TRATAMENTO DE ERROS - AULA 10            "
echo "=========================================================================="

echo -e "\n[n] Consultando dados pre-populados pelo Seed..."
curl -s http://localhost:3000/api/v1/frota | jq .

echo -e "\n[2] Testando erro de placa duplicado 9Conflito - Status 409)..."
curl -s -X POST http://localhost:3000/api/v1/frota/veiculo \
	-H "Content-Type: application/json" \
	-d '{"placa":"VOL-1010","montadora":"Volvo","modelo":"FH 540"}' | jq .
