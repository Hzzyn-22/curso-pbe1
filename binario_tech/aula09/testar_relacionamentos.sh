#!/bin/bash
echo "=========================================================================="
echo "       AUDITORIA DE RELACIONAMENTOS ( JOIN) - BINARIO TECH                "
echo "=========================================================================="

echo -e "\n[1] Cadastrando Veiculo Scania..."
curl -s -X POST http://localhost:3000/api/v1/telemetira/veiculo-teste \
	-H "Content-Type: application/json" \
	-d '{"placa":"SCA-9900","montadora":"Scania","modelo":"R450"}' | jq .

echo -e "\n[2] Cadastrando Veiculo Scania..."
curl -s -X POST http://localhost:3000/api/v1/telemetira \
        -H "Content-Type: application/json" \
        -d '{"veiculo_id":1,"velocidade":88.5,"temperatura_motor":92.0}' | jq .

echo -e "\n[1] Cadastrando Veiculo Scania..."
curl -s  POST http://localhost:3000/api/v1/telemetira/relatorio | jq .
