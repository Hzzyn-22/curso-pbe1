#!/bin/bash
echo "=================================================="
echo "    PIPELINE DE DEPLOY AUTOMATIZADO - BINÁRIO TECH"
echo "=================================================="

# EXERCÍCIO 2: Gravando data, hora e hash do último commit no log
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "no-commit")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "[$TIMESTAMP] Deploy realizado - Commit: $COMMIT_HASH" >> deploy_history.log

echo "[1/2] Verificando dependências..."
npm install --quiet

echo "[2/2] Reiniciando aplicação Node.js..."
pkill -f "node server.js" 2>/dev/null || true
nohup node server.js > server.log 2>&1 &
sleep 2

echo "[OK] Deploy realizado com sucesso!"
echo "=================================================="
