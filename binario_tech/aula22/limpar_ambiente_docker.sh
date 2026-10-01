#!/bin/bash
echo "=================================================="
echo "   LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/2] Parando e removendo containers inativos..."
docker container prune -f

echo "[2/2] Removendo imagens pendentes (dangling images)..."
docker image prune -f

echo "=================================================="
echo " [OK] Limpeza de ambiente concluída com sucesso!"
echo "=================================================="
