Exercícios de Telemetria Aula 03 — passo a passo

Este guia explica como executar os oito exercícios de linha de comando e da API de telemetria. Os exemplos assumem que o servidor está configurado para a porta 3015.


Execute os comandos no terminal do projeto. No material da aula, o diretório é ~/binario_tech/aula03. Ajuste o caminho se o seu projeto estiver em outro local.

Preparação

Entre no diretório do projeto:

Bash


cd ~/binario_tech/aula03



Confira se as ferramentas necessárias estão disponíveis:

Bash


node --version
npm --version
curl --version
jq --version
http --version



Se jq ou http não estiver instalado no Google Cloud Shell/Ubuntu:

Bash


sudo apt-get update
sudo apt-get install -y jq httpie



Confirme também que o servidor usa a porta 3015 em telemetria.js, por exemplo:

Plain Text


const PORT = 3015;



Exercício 01 — cURL e jq: mostrar somente o modelo Scania

Faça uma requisição GET para a rota Scania e envie a resposta para o jq:

Bash


curl -s http://localhost:3015/api/v1/scania | jq -r '.modelo'



O resultado esperado, de acordo com o exemplo da aula, é:

Plain Text


R450



-s deixa o cURL silencioso e -r faz o jq exibir o valor sem aspas.

Exercício 02 — HTTPie: salvar a resposta Mercedes em arquivo

Faça a requisição com HTTPie e redirecione o corpo JSON para mercedes.json:

Bash


http --body GET http://localhost:3015/api/v1/mercedes > mercedes.json



Confira o arquivo:

Bash


cat mercedes.json



O conteúdo deve ser um objeto JSON com os dados da Mercedes-Benz, incluindo o campo status.

Exercício 03 — jq: filtrar somente o status da Mercedes

Leia o arquivo criado no Exercício 02 e extraia a propriedade status:

Bash


jq -r '.status' mercedes.json



Resultado esperado, conforme os dados da aula:

Plain Text


OK



Se quiser visualizar o JSON inteiro formatado antes de filtrar:

Bash


jq . mercedes.json



Exercício 04 — adicionar e testar a rota Volvo

1. Editar telemetria.js

Abra o arquivo em um editor de terminal, como nano:

Bash


nano telemetria.js



Adicione a rota abaixo antes de app.listen(... ):

Plain Text


// Rota Volvo
app.get('/api/v1/volvo', (req, res) => {
    res.json({
        montadora: 'Volvo',
        modelo: 'FH 540',
        status: 'OK',
        conexao: true,
        velocidade_media: 80
    });
});



Salve e feche o nano com Ctrl+O, Enter e Ctrl+X.

2. Reiniciar o servidor

Se o servidor estiver rodando em primeiro plano, volte ao terminal dele e pressione Ctrl+C. Depois inicie novamente:

Bash


node telemetria.js



Deixe esse terminal aberto. Se preferir iniciar em segundo plano:

Bash


node telemetria.js > servidor.log 2>&1 &



3. Testar a rota

Em outro terminal, execute:

Bash


curl -s http://localhost:3015/api/v1/volvo | jq .



A resposta deve conter, entre outros dados:

JSON


{
  "montadora": "Volvo",
  "modelo": "FH 540",
  "status": "OK",
  "conexao": true,
  "velocidade_media": 80
}



Exercício 05 — configurar e testar npm start

Adicione o script start ao package.json sem substituir os outros scripts:

Bash


npm pkg set 'scripts.start=node telemetria.js'



Confira a configuração:

Bash


npm pkg get scripts



Inicie a aplicação usando o script:

Bash


npm start



Se aparecer uma mensagem informando que o servidor está rodando em http://localhost:3015, o comando funcionou. Se já houver outra instância usando a porta, encerre-a antes de iniciar uma nova.

Exercício 06 — salvar a auditoria em relatorio.log

Com o servidor em execução, rode o script de auditoria redirecionando a saída padrão e os erros para o arquivo de log:

Bash


./testar_telemetria.sh > relatorio.log 2>&1



Se o script ainda não tiver permissão de execução:

Bash


chmod +x testar_telemetria.sh
./testar_telemetria.sh > relatorio.log 2>&1



Leia o relatório:

Bash


cat relatorio.log



O operador > substitui o conteúdo anterior do arquivo. Para acrescentar uma nova execução ao final do log, use >>:

Bash


./testar_telemetria.sh >> relatorio.log 2>&1



Exercício 07 — filtrar montadora e status da rota VW

Faça a requisição e selecione as duas propriedades em uma única expressão jq:

Bash


curl -s http://localhost:3015/api/v1/vw | jq '{montadora, status}'



Resultado esperado, conforme os dados da aula:

JSON


{
  "montadora": "Volkswagen",
  "status": "ALERTA"
}



Exercício 08 — localizar e encerrar o processo Node.js

Liste os processos Node.js:

Bash


ps aux | grep node



Na saída, localize a linha do servidor node telemetria.js. O PID é o número na segunda coluna. Não use o PID da própria linha grep.

Encerre somente o processo do servidor, substituindo <PID> pelo número encontrado:

Bash


kill -9 <PID>



Por exemplo, se o PID mostrado for 12345:

Bash


kill -9 12345



Confirme que o processo terminou:

Bash


ps aux | grep node



Problemas comuns

•
Connection refused: o servidor não está iniciado, está usando outra porta ou encerrou. Inicie-o com node telemetria.js e confira se a porta é 3015.

•
jq: command not found: instale com sudo apt-get install -y jq.

•
http: command not found: instale HTTPie com sudo apt-get install -y httpie.

•
EADDRINUSE: a porta 3015 já está ocupada. Localize o processo com ps aux | grep node e encerre a instância antiga antes de iniciar outra.

•
Permission denied no script: execute chmod +x testar_telemetria.sh.

•
A rota Volvo retorna 404: confira se o bloco da rota foi salvo em telemetria.js, antes de app.listen(... ), e reinicie o servidor.

