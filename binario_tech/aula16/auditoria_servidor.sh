#!/bin/bash

echo "===== AUDITORIA DE PROCESSOS NODE.JS =====" > processos.log
echo "Data: $(date)" >> processos.log
echo "" >> processos.log

ps aux | grep node >> processos.log