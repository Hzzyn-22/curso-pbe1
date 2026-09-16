#!/usr/bin/env bash
set -u

BASE_URL="${BASE_URL:-http://localhost:3000}"
LOG="auditoria.log"

{
  echo "===== AUDITORIA COMPLETA - $(date '+%Y-%m-%d %H:%M:%S') ====="
  for rota in \
    "/api/v1/telemetria" \
    "/api/v1/telemetria/scania" \
    "/api/v1/telemetria/mercedes"; do
    echo "\n--- GET ${rota} ---"
    curl -sS -w "\nHTTP_STATUS=%{http_code}\n" "${BASE_URL}${rota}"
  done
  echo "\n===== FIM DA AUDITORIA ====="
} >> "${LOG}"

echo "Auditoria registrada em ${LOG}."
