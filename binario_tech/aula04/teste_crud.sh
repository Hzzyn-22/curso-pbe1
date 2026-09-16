#!/bin/bash

LOGFILE="crud_result.log"

echo "Iniciando testes CRUD..." > $LOGFILE

# Cadastro de 2 veículos
curl -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Scania","modelo":"R500","placa":"ABC-1234"}' >> $LOGFILE

curl -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Mercedes","modelo":"Actros","placa":"XYZ-5678"}' >> $LOGFILE

# Atualiza 1 deles (ID 1 como exemplo)
curl -X PATCH http://localhost:3000/api/v1/veiculos/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}' >> $LOGFILE

# Deleta o outro (ID 2 como exemplo)
curl -X DELETE http://localhost:3000/api/v1/veiculos/2 >> $LOGFILE

echo "Testes concluídos." >> $LOGFILE

