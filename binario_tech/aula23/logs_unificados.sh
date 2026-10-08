#!/bin/bash
echo "=================================================="
echo "    MONITORAMENTO DE LOGS UNIFICADOS - AULA 23   "
echo "=================================================="
echo "Pressione [Ctrl + C] para sair da visualização."
echo ""

# Exibe as últimas 20 linhas de log de cada serviço e acompanha em tempo real (-f)
docker compose logs -f --tail=20
