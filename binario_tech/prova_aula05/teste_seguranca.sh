#!/bin/bash


API_URL="http://localhost:3015/api/v1"
CHAVE_VALIDA="binario-tech-secret-2026"


echo "=== INICIANDO AUDITORIA DE SEGURANCA ==="
date


echo -e "\n--- Teste 1: Acesso Não Autorizado (401) ---"
curl -i -s "$API_URL/motoristas"


echo -e "\n--- Teste 2: Erro de Validação de CNH (400) ---"
curl -i -s -X POST "$API_URL/motoristas" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos Silva", "cnh": "123"}'


echo -e "\n--- Teste 3: Rota Inexistente (404) ---"
curl -i -s "$API_URL/clientes"


echo -e "\n--- Teste 4: Cadastro Bem-Sucedido com Chave Válida (201) ---"
curl -i -s -X POST "$API_URL/motoristas" \
  -H "X-API-KEY: $CHAVE_VALIDA" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos Silva", "cnh": "12345678901"}'


echo -e "\n--- Teste 5: Consulta Bem-Sucedida com Chave Válida (200) ---"
curl -i -s -H "X-API-KEY: $CHAVE_VALIDA" "$API_URL/motoristas"


echo -e "\n=== AUDITORIA FINALIZADA ==="
