#!/bin/bash

LOG_FILE="crud_result.log"
echo "=== INICIANDO TESTE CRUD - $(date) ===" > $LOG_FILE

echo -e "\n[1/4] Cadastrando primeiro veiculo..." >> $LOG_FILE
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Volvo","modelo":"FH 540","placa":"KLL-9090","status":"DISPONIVEL"}' >> $LOG_FILE 2>&1

echo -e "\n[2/4] Cadastrando segundo veiculo..." >> $LOG_FILE
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Scania","modelo":"R450","placa":"XYZ-8888","status":"DISPONIVEL"}' >> $LOG_FILE 2>&1

echo -e "\n[3/4] Atualizando status do veiculo 1..." >> $LOG_FILE
curl -i -X PATCH http://localhost:3000/api/v1/veiculos/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}' >> $LOG_FILE 2>&1

echo -e "\n[4/4] Deletando veiculo 2..." >> $LOG_FILE
curl -i -X DELETE http://localhost:3000/api/v1/veiculos/2 >> $LOG_FILE 2>&1

echo -e "\n=== TESTES CONCLUIDOS ===" >> $LOG_FILE
echo "Testes executados com sucesso! Logs salvos em $LOG_FILE."
