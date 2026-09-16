#!/bin/bash

echo "===== Teste de Segurança =====" > audit_seguranca.log
echo "Data: $(date)" >> audit_seguranca.log

# Teste sem chave de API
echo -e "\n[TESTE 1] POST sem chave de API" >> audit_seguranca.log
curl -s -X POST http://localhost:3000/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","cnh":"123"}' -i >> audit_seguranca.log

# Teste com chave inválida
echo -e "\n[TESTE 2] POST com chave inválida" >> audit_seguranca.log
curl -s -X POST http://localhost:3000/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -H "x-api-key: chave-errada" \
  -d '{"nome":"Maria","cnh":"12345678901"}' -i >> audit_seguranca.log

# Teste com chave válida e CNH inválida
echo -e "\n[TESTE 3] POST com chave válida e CNH inválida" >> audit_seguranca.log
curl -s -X POST http://localhost:3000/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -H "x-api-key: binario-tech-secret-2026" \
  -d '{"nome":"Pedro","cnh":"123"}' -i >> audit_seguranca.log

# Teste com chave válida e CNH válida
echo -e "\n[TESTE 4] POST com chave válida e CNH válida" >> audit_seguranca.log
curl -s -X POST http://localhost:3000/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -H "x-api-key: binario-tech-secret-2026" \
  -d '{"nome":"Ana","cnh":"12345678901"}' -i >> audit_seguranca.log

echo -e "\n===== Fim dos Testes =====" >> audit_seguranca.log

