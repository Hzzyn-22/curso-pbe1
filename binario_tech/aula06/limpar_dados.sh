#!/usr/bin/env bash
pkill -f "[n]ode.*ocorrencias_api.js" 2>/dev/null || true
rm -f "$(dirname "$0")/ocorrencias.json"
echo "Processo Node.js encerrado e ocorrencias.json excluido."
