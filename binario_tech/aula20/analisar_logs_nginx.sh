#!/bin/bash

LOG_FILE="/var/log/nginx/access.log"

# Se o log padrão não existir, usa/cria um arquivo de log local para testes
if [ ! -f "$LOG_FILE" ]; then
    LOG_FILE="access.log"
    if [ ! -f "$LOG_FILE" ]; then
        echo '127.0.0.1 - - [01/Oct/2026:17:00:00 +0000] "GET /status-nginx HTTP/1.1" 200 45' > access.log
        echo '127.0.0.1 - - [01/Oct/2026:17:01:00 +0000] "GET /api/v1/proxy/info HTTP/1.1" 200 120' >> access.log
    fi
fi

# Exibe as últimas 15 linhas filtrando pelo status 200 OK
tail -n 15 "$LOG_FILE" | grep " 200 "
