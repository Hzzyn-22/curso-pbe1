o "========================================================================="
echo "                   AUDITORIA DE TELEMETRIA - BINARIO TECH                 "
echo "  Data/Hora: $(date)"
echo "========================================================================="

echo -e "\n[1] Testando Rota Scania..."
curl -s http://localhost:3001/api/v1/scania | jq .

echo -e "\n[2] Testando Rota Mercedes Benz..."
curl -s http://localhost:3001/api/v1/mercedes | jq .

echo -e "\n[3] Testando Rota Volkswagen..."
curl -s http://localhost:3001/api/v1/vw | jq .

echo -e "\n[4] Testando Rota Volvo..."
curl -s http://localhost:3001/api/v1/volvo | jq .

echo "Teste /status - $(date)"
curl http://localhost:3000/status
echo ""

echo "Teste /scania/info - $(date)"
curl http://localhost:3000/scania/info
echo ""

echo "Teste /vw/info - $(date)"
curl http://localhost:3000/vw/info
echo ""


echo -e "======================================================================"
echo "auditoria finalizada com sucesso!"

