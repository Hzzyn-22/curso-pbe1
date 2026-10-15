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
__________________________________________________________________________________________________________________________________

# 🚛 Binario Tech — Aula 04
## Arquitetura HTTP, Rotas RESTful e APIs

![Node.js](https://img.shields.io/badge/Node.js-JavaScript-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-API-black?logo=express)
![HTTP](https://img.shields.io/badge/HTTP-REST-blue)
![Bash](https://img.shields.io/badge/Bash-Shell-lightgrey?logo=gnubash)

Repositório de estudos da disciplina **Programação Back-End 1 (PBE1)**, referente à Aula 04 da Consultoria Binario Tech.

O projeto consiste na criação de uma API RESTful para gerenciamento de veículos, utilizando Node.js, Express, requisições HTTP, JSON, cURL e scripts Bash.

---

## 📚 Sumário

1. [Objetivos da aula](#-1-objetivos-da-aula)
2. [Fundamentos do HTTP](#-2-fundamentos-do-http)
3. [Métodos HTTP](#-3-métodos-http)
4. [Códigos de status](#-4-códigos-de-status-http)
5. [Preparação do ambiente](#-5-preparação-do-ambiente)
6. [Código da API](#-6-código-da-api-frota_apijs)
7. [Execução e testes](#-7-execução-e-testes-da-api)
8. [Resolução dos exercícios](#-8-resolução-dos-8-exercícios)
9. [Script Bash](#-9-script-bash-teste_crudsh)
10. [Arquivo de logs](#-10-arquivo-crud_resultlog)
11. [Resumo para a prova](#-11-resumo-para-a-prova)
12. [GitHub e entrega](#-12-github-e-entrega)

---

## 🎯 1. Objetivos da aula

- Compreender a anatomia de uma requisição e resposta HTTP.
- Aprender a utilizar GET, POST, PUT, PATCH e DELETE.
- Criar uma API RESTful utilizando Node.js e Express.
- Implementar rotas CRUD para o recurso `/api/v1/veiculos`.
- Validar dados recebidos no body das requisições.
- Utilizar query parameters e parâmetros de rota.
- Retornar códigos HTTP adequados.
- Testar a API utilizando cURL e jq.
- Automatizar operações CRUD com Bash.
- Registrar resultados em um arquivo de log.

## 🌐 2. Fundamentos do HTTP

HTTP é um protocolo de comunicação entre clientes e servidores.

O cliente envia uma requisição, o servidor processa os dados e devolve uma resposta.

### Anatomia de uma requisição

| Elemento | Explicação | Exemplo |
|---|---|---|
| Método | Operação solicitada | GET |
| URI | Caminho do recurso | `/api/v1/veiculos` |
| Headers | Informações adicionais | `Content-Type: application/json` |
| Query params | Parâmetros de consulta | `?status=DISPONIVEL` |
| Body | Dados enviados | `{"placa":"ABC-1234"}` |

Exemplo de requisição:

```http
POST /api/v1/veiculos
Content-Type: application/json

{
  "placa": "ABC-1234",
  "montadora": "Scania",
  "modelo": "R450"
}
```

### Anatomia de uma resposta

Uma resposta HTTP contém o código de status, os headers e, normalmente, um body com os dados retornados.

Exemplo:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 3,
  "placa": "ABC-1234",
  "montadora": "Scania",
  "modelo": "R450",
  "status": "DISPONIVEL"
}
```

### JSON

JSON é um formato de representação de dados utilizado para enviar e receber informações nas APIs.

Exemplo:

```json
{
  "id": 1,
  "placa": "ABC-1234",
  "montadora": "Scania",
  "modelo": "R450",
  "status": "DISPONIVEL"
}
```

No Express, utilizamos:

```javascript
app.use(express.json());
```

Esse middleware permite interpretar o body de requisições que enviam JSON válido.

### Headers

Os headers transportam informações adicionais sobre a requisição.

Exemplo:

```bash
-H "Content-Type: application/json"
```

Esse header informa que o corpo da requisição está sendo enviado em formato JSON.

### Parâmetros de rota

Exemplo:

```http
GET /api/v1/veiculos/1
```

No Express:

```javascript
const id = parseInt(req.params.id);
```

O `req.params.id` obtém o valor informado no caminho da URL.

### Query parameters

Exemplo:

```http
GET /api/v1/veiculos?status=DISPONIVEL
```

No Express:

```javascript
const { status } = req.query;
```

O `req.query` permite acessar parâmetros utilizados para filtrar ou consultar informações.

---

## 🔄 3. Métodos HTTP

| Método | Função | Exemplo na API |
|---|---|---|
| GET | Consultar informações | Listar veículos |
| POST | Criar um recurso | Cadastrar veículo |
| PUT | Substituir os dados completos | Alterar todos os dados |
| PATCH | Atualizar parcialmente | Alterar somente o status |
| DELETE | Remover um recurso | Excluir veículo |

### GET — Consultar

```javascript
app.get('/api/v1/veiculos', (req, res) => {
    res.status(200).json(veiculos);
});
```

### POST — Criar

```javascript
app.post('/api/v1/veiculos', (req, res) => {
    // Recebe e valida os dados.
});
```

### PUT — Substituir

```javascript
app.put('/api/v1/veiculos/:id', (req, res) => {
    // Substitui os dados completos do veículo.
});
```

### PATCH — Atualizar parcialmente

```javascript
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
    // Atualiza somente o status.
});
```

### DELETE — Excluir

```javascript
app.delete('/api/v1/veiculos/:id', (req, res) => {
    // Remove o veículo.
});
```

**Diferença importante para a prova:** PUT substitui o recurso completo. PATCH altera apenas uma parte dele.

---

## 🚦 4. Códigos de status HTTP

| Código | Significado | Utilização |
|---|---|---|
| 200 | OK | Operação realizada com sucesso |
| 201 | Created | Recurso criado |
| 204 | No Content | Sucesso sem conteúdo na resposta |
| 400 | Bad Request | Dados inválidos ou obrigatórios ausentes |
| 401 | Unauthorized | Autenticação necessária ou inválida |
| 403 | Forbidden | Acesso proibido |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

Exemplos no Express:

```javascript
res.status(200).json(veiculos);
```

```javascript
res.status(201).json(novoVeiculo);
```

```javascript
res.status(400).json({
    erro: "Campos obrigatorios."
});
```

```javascript
res.status(404).json({
    erro: "Veiculo nao encontrado."
});
```

```javascript
res.status(500).json({
    erro: "Erro interno do servidor."
});
```

---

## 💻 5. Preparação do ambiente

Todos os comandos abaixo seguem o procedimento utilizado na aula.

### Passo 1 — Entrar na pasta do projeto

```bash
cd ~/binario_tech
```

### Passo 2 — Criar a pasta aula04

```bash
mkdir -p aula04
```

### Passo 3 — Acessar a pasta

```bash
cd aula04
```

### Passo 4 — Inicializar o projeto Node.js

```bash
npm init -y
```

Esse comando cria o arquivo `package.json`.

### Passo 5 — Instalar o Express

```bash
npm install express
```

### Passo 6 — Verificar as ferramentas

```bash
node --version
npm --version
curl --version
jq --version
```

O Node.js executa o servidor, o Express cria as rotas, o cURL realiza requisições HTTP e o jq formata as respostas JSON.

### Estrutura dos arquivos

```text
binario_tech/
└── aula04/
    ├── package.json
    ├── package-lock.json
    ├── node_modules/
    ├── frota_api.js
    ├── teste_crud.sh
    └── crud_result.log
```

---

## 🚛 6. Código da API — `frota_api.js`

### Passo 1 — Criar o arquivo

```bash
nano frota_api.js
```

### Passo 2 — Inserir o código

O código abaixo mantém a implementação utilizada na aula e acrescenta a rota PUT solicitada no Exercício 07.

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Banco de dados em memoria
let veiculos = [
    { id: 1, placa: "ABC-1234", montadora: "Scania", modelo: "R450", status: "DISPONIVEL" },
    { id: 2, placa: "XYZ-9876", montadora: "Mercedes-Benz", modelo: "Actros", status: "EM_ROTA" }
];

// 1. GET /api/v1/veiculos - Listar todos os veiculos
// Suporta filtro por status query param
app.get('/api/v1/veiculos', (req, res) => {
    const { status } = req.query;

    if (status) {
        const filtrados = veiculos.filter(
            v => v.status.toUpperCase() === status.toUpperCase()
        );

        return res.status(200).json(filtrados);
    }

    res.status(200).json(veiculos);
});

// 2. GET /api/v1/veiculos/:id - Buscar veiculo por ID
app.get('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado na base de dados."
        });
    }

    res.status(200).json(veiculo);
});

// 3. POST /api/v1/veiculos - Cadastrar novo veiculo
app.post('/api/v1/veiculos', (req, res) => {
    const { placa, montadora, modelo } = req.body;

    if (!placa || !montadora || !modelo) {
        return res.status(400).json({
            erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."
        });
    }

    const novoVeiculo = {
        id: veiculos.length + 1,
        placa,
        montadora,
        modelo,
        status: "DISPONIVEL"
    };

    veiculos.push(novoVeiculo);

    res.status(201).json(novoVeiculo);
});

// 4. PATCH /api/v1/veiculos/:id/status - Atualizar status
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    if (!status) {
        return res.status(400).json({
            erro: "O campo 'status' e obrigatorio."
        });
    }

    veiculo.status = status.toUpperCase();

    res.status(200).json({
        mensagem: "Status atualizado com sucesso!",
        veiculo
    });
});

// 5. PUT /api/v1/veiculos/:id - Substituir dados completos
app.put('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { placa, montadora, modelo, status } = req.body;

    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    if (!placa || !montadora || !modelo || !status) {
        return res.status(400).json({
            erro: "Placa, montadora, modelo e status sao obrigatorios."
        });
    }

    const veiculoAtualizado = {
        id,
        placa,
        montadora,
        modelo,
        status: status.toUpperCase()
    };

    veiculos[index] = veiculoAtualizado;

    res.status(200).json({
        mensagem: "Veiculo atualizado com sucesso!",
        veiculo: veiculoAtualizado
    });
});

// 6. DELETE /api/v1/veiculos/:id - Remover veiculo
app.delete('/api/v1/veiculos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    veiculos.splice(index, 1);

    res.status(200).json({
        mensagem: `Veiculo ID ${id} removido com sucesso.`
    });
});

app.listen(PORT, () => {
    console.log(
        `[Binario Tech] API de Frotas rodando em http://localhost:${PORT}`
    );
});
```

### Passo 3 — Salvar o arquivo

No nano:

- `Ctrl + O` para salvar.
- `Enter` para confirmar o nome.
- `Ctrl + X` para sair.

### Explicação das rotas

**GET `/api/v1/veiculos`**

Lista todos os veículos. Se receber o query parameter `status`, retorna apenas os veículos que correspondem ao filtro.

**GET `/api/v1/veiculos/:id`**

Procura o veículo pelo ID. Se não encontrar, retorna `404`.

**POST `/api/v1/veiculos`**

Recebe placa, montadora e modelo. Se algum campo estiver ausente, retorna `400`. Se o cadastro funcionar, retorna `201`.

**PATCH `/api/v1/veiculos/:id/status`**

Localiza o veículo e altera somente seu status.

**PUT `/api/v1/veiculos/:id`**

Substitui os dados completos do veículo, mantendo o ID informado na URL.

**DELETE `/api/v1/veiculos/:id`**

Localiza e remove o veículo. Se o ID não existir, retorna `404`.

**Importante:** os veículos ficam armazenados em memória. Ao reiniciar o servidor, a lista volta aos dois veículos iniciais.

---

## ▶️ 7. Execução e testes da API

### Passo 1 — Iniciar o servidor

```bash
node frota_api.js &
```

O `&` executa o processo em segundo plano.

Para conferir a mensagem de inicialização, o processo precisa estar ativo e o servidor deve conseguir utilizar a porta 3000.

### Passo 2 — Testar GET

```bash
curl -s http://localhost:3000/api/v1/veiculos | jq .
```

### Passo 3 — Testar POST

```bash
curl -s -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"VWX-5555","montadora":"Volkswagen","modelo":"Delivery"}' | jq .
```

### Passo 4 — Testar PATCH

```bash
curl -s -X PATCH http://localhost:3000/api/v1/veiculos/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"MANUTENCAO"}' | jq .
```

### Passo 5 — Testar DELETE

```bash
curl -s -X DELETE http://localhost:3000/api/v1/veiculos/2 | jq .
```

### Como verificar o código HTTP

Para exibir o código HTTP junto da resposta:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  http://localhost:3000/api/v1/veiculos
```

O resultado esperado é `HTTP 200`.

---

## 📝 8. Resolução dos 8 exercícios

### Exercício 01 — Buscar o veículo de ID 1

**Enunciado:** efetuar uma requisição GET buscando somente o veículo de ID 1 e formatar o resultado com jq.

Comando:

```bash
curl -s http://localhost:3000/api/v1/veiculos/1 | jq .
```

**Como funciona:**

1. O método GET solicita informações.
2. O número `1` identifica o veículo.
3. A rota procura o ID na lista.
4. O `jq .` formata a resposta JSON.

**Resultado esperado:**

```json
{
  "id": 1,
  "placa": "ABC-1234",
  "montadora": "Scania",
  "modelo": "R450",
  "status": "DISPONIVEL"
}
```

Status esperado: `200 OK`.

### Exercício 02 — Cadastrar um caminhão Volvo

**Enunciado:** cadastrar um veículo com placa `KLL-9090`, montadora `Volvo` e modelo `FH 540`.

Comando:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}'
```

**Como funciona:**

1. POST solicita a criação de um recurso.
2. O header informa que o body está em JSON.
3. O `-d` envia os dados do veículo.
4. A API verifica os campos obrigatórios.
5. O veículo é adicionado à lista.

Status esperado: `201 Created`.

Para formatar o JSON com jq e visualizar o status separadamente:

```bash
curl -s -o /tmp/veiculo.json \
  -w "HTTP %{http_code}\n" \
  -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}'

cat /tmp/veiculo.json | jq .
```

Execute o cadastro apenas uma vez para não criar veículos duplicados.

### Exercício 03 — Cadastrar sem informar a placa

**Enunciado:** enviar um POST sem o campo `placa` e confirmar o status `400 Bad Request`.

Comando:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora":"Volvo","modelo":"FH 540"}'
```

**Como funciona:**

1. A requisição envia a montadora e o modelo.
2. A placa não foi informada.
3. A validação identifica o campo ausente.
4. O cadastro é interrompido.
5. A API retorna o erro e o status `400`.

Resposta esperada:

```json
{
  "erro": "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."
}
```

### Exercício 04 — Filtrar por status

**Enunciado:** listar os veículos que estão disponíveis.

Comando:

```bash
curl -s "http://localhost:3000/api/v1/veiculos?status=DISPONIVEL" | jq .
```

**Como funciona:**

1. A rota recebe o parâmetro `status`.
2. O Express disponibiliza o valor em `req.query.status`.
3. O método `filter()` seleciona os veículos correspondentes.
4. A API retorna a lista filtrada com status `200`.

Trecho responsável pelo filtro:

```javascript
const { status } = req.query;

if (status) {
    const filtrados = veiculos.filter(
        v => v.status.toUpperCase() === status.toUpperCase()
    );

    return res.status(200).json(filtrados);
}
```

O filtro não diferencia letras maiúsculas e minúsculas.

### Exercício 05 — Atualizar o veículo de ID 3

**Enunciado:** alterar o status do veículo de ID 3 para `EM_ROTA` utilizando PATCH.

Comando:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  -X PATCH http://localhost:3000/api/v1/veiculos/3/status \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}'
```

**Como funciona:**

1. PATCH indica uma atualização parcial.
2. O ID `3` identifica o veículo.
3. O body contém o novo status.
4. A API procura o veículo.
5. O campo status é atualizado.

Status esperado: `200 OK`, se o veículo de ID 3 existir.

**Atenção:** se você reiniciou o servidor e ainda não cadastrou o Volvo do Exercício 02, o ID 3 não existirá. Nesse caso, o retorno correto será `404`. Execute primeiro o cadastro do Exercício 02.

### Exercício 06 — Testar um ID inexistente

**Enunciado:** tentar atualizar ou deletar o veículo de ID 99 e verificar o status `404 Not Found`.

Opção A — PATCH:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  -X PATCH http://localhost:3000/api/v1/veiculos/99/status \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}'
```

Opção B — DELETE:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  -X DELETE http://localhost:3000/api/v1/veiculos/99
```

Resposta esperada:

```json
{
  "erro": "Veiculo nao encontrado."
}
```

Status esperado: `404 Not Found`.

O `findIndex()` retorna `-1` quando não encontra o veículo. A API verifica esse resultado antes de executar a exclusão.

### Exercício 07 — Criar a rota PUT

**Enunciado:** adicionar uma rota PUT em `/api/v1/veiculos/:id` para substituir todos os dados do veículo.

O código completo dessa rota já está incluído no arquivo `frota_api.js`, na seção anterior.

Para testar, substitua os dados do veículo de ID 3:

```bash
curl -s -w "\nHTTP %{http_code}\n" \
  -X PUT http://localhost:3000/api/v1/veiculos/3 \
  -H "Content-Type: application/json" \
  -d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540","status":"EM_ROTA"}'
```

**Como funciona:**

1. A rota recebe o ID pelo caminho.
2. O body contém todos os campos do veículo.
3. A API procura o índice do veículo.
4. Se o ID não existir, retorna `404`.
5. Se faltar um campo obrigatório, retorna `400`.
6. Se tudo estiver correto, substitui o objeto completo.

Status esperado: `200 OK`.

A diferença para PATCH é que o PUT exige todos os campos definidos nessa implementação.

### Exercício 08 — Criar o script Bash `teste_crud.sh`

**Enunciado:** criar um script que cadastre dois veículos, atualize um deles, exclua o outro e registre os resultados em `crud_result.log`.

Crie o arquivo:

```bash
nano teste_crud.sh
```

Cole o código:

```bash
#!/bin/bash

# Script de testes CRUD - Binario Tech
# Requer a API em execucao na porta 3000.

BASE_URL="http://localhost:3000/api/v1/veiculos"
LOG="crud_result.log"

# Limpa o log anterior
> "$LOG"

echo "========================================" | tee -a "$LOG"
echo " TESTES CRUD - BINARIO TECH" | tee -a "$LOG"
echo " Data: $(date)" | tee -a "$LOG"
echo "========================================" | tee -a "$LOG"

# Funcao para executar requisicoes e registrar resultados
registrar() {
    DESCRICAO="$1"
    shift

    echo "" | tee -a "$LOG"
    echo ">>> $DESCRICAO" | tee -a "$LOG"

    curl -s -w "\nHTTP_STATUS:%{http_code}\n" "$@" \
        | tee -a "$LOG"
}

# 1. Cadastrar o primeiro veiculo
registrar "POST - Cadastrar caminhao Volvo" \
    -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}'

# 2. Cadastrar o segundo veiculo
registrar "POST - Cadastrar caminhao Volkswagen" \
    -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -d '{"placa":"VWX-5555","montadora":"Volkswagen","modelo":"Delivery"}'

# 3. Atualizar o primeiro veiculo
registrar "PATCH - Atualizar status do veiculo ID 3" \
    -X PATCH "$BASE_URL/3/status" \
    -H "Content-Type: application/json" \
    -d '{"status":"EM_ROTA"}'

# 4. Excluir o segundo veiculo
registrar "DELETE - Remover veiculo ID 4" \
    -X DELETE "$BASE_URL/4"

echo "" | tee -a "$LOG"
echo "========================================" | tee -a "$LOG"
echo " TESTES FINALIZADOS" | tee -a "$LOG"
echo " Log salvo em: $LOG" | tee -a "$LOG"
echo "========================================" | tee -a "$LOG"
```

### Como o script funciona

1. Cria ou limpa o arquivo `crud_result.log`.
2. Registra a data e o início dos testes.
3. Executa um POST para cadastrar o Volvo.
4. Executa outro POST para cadastrar o Volkswagen.
5. Executa PATCH para alterar o status do primeiro veículo.
6. Executa DELETE para remover o segundo veículo.
7. Registra as respostas e os códigos HTTP no log.

**Importante sobre os IDs:** esse script pressupõe que a API acabou de ser iniciada com os dois veículos originais e que nenhum outro cadastro foi realizado. Nessas condições, os dois novos veículos recebem os IDs 3 e 4.

### Dar permissão de execução

```bash
chmod +x teste_crud.sh
```

### Executar o script

```bash
./teste_crud.sh
```

### Conferir os resultados

```bash
cat crud_result.log
```

Se quiser visualizar apenas as linhas com os códigos HTTP:

```bash
grep "HTTP_STATUS:" crud_result.log
```

Os resultados esperados são:

```text
HTTP_STATUS:201
HTTP_STATUS:201
HTTP_STATUS:200
HTTP_STATUS:200
```

Esses códigos representam os dois cadastros, a atualização e a exclusão, respectivamente. Os resultados dependem de a API estar funcionando e dos IDs corresponderem aos veículos esperados.

---

## 📄 10. Arquivo `crud_result.log`

O arquivo de log é criado automaticamente pelo script `teste_crud.sh`.

Ele registra:

- A data de execução.
- A descrição de cada operação.
- As respostas JSON da API.
- Os códigos HTTP retornados.
- A mensagem de encerramento dos testes.

Um exemplo simplificado do resultado esperado:

```text
========================================
 TESTES CRUD - BINARIO TECH
========================================

>>> POST - Cadastrar caminhao Volvo
{"id":3,"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540","status":"DISPONIVEL"}
HTTP_STATUS:201

>>> POST - Cadastrar caminhao Volkswagen
{"id":4,"placa":"VWX-5555","montadora":"Volkswagen","modelo":"Delivery","status":"DISPONIVEL"}
HTTP_STATUS:201

>>> PATCH - Atualizar status do veiculo ID 3
{"mensagem":"Status atualizado com sucesso!","veiculo":{"id":3,"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540","status":"EM_ROTA"}}
HTTP_STATUS:200

>>> DELETE - Remover veiculo ID 4
{"mensagem":"Veiculo ID 4 removido com sucesso."}
HTTP_STATUS:200
```

O conteúdo real do arquivo será gerado pelas respostas recebidas da API.

Para visualizar:

```bash
cat crud_result.log
```

Para pesquisar apenas os erros HTTP:

```bash
grep -E "HTTP_STATUS:(400|404|500)" crud_result.log
```

Se nenhum resultado aparecer, nenhuma dessas linhas de erro foi encontrada no arquivo.

---

## 🧠 11. Resumo para a prova

### Comandos principais

| Objetivo | Comando |
|---|---|
| Entrar no projeto | `cd ~/binario_tech/aula04` |
| Criar arquivo | `nano frota_api.js` |
| Iniciar servidor | `node frota_api.js &` |
| Listar veículos | `curl -s http://localhost:3000/api/v1/veiculos \| jq .` |
| Consultar ID | `curl -s http://localhost:3000/api/v1/veiculos/1 \| jq .` |
| Criar veículo | `curl -X POST ...` |
| Atualizar parcialmente | `curl -X PATCH ...` |
| Substituir dados | `curl -X PUT ...` |
| Excluir veículo | `curl -X DELETE ...` |
| Executar script | `./teste_crud.sh` |
| Ver log | `cat crud_result.log` |

### Métodos HTTP para memorizar

- **GET:** consulta.
- **POST:** cria.
- **PUT:** substitui todos os dados.
- **PATCH:** altera parcialmente.
- **DELETE:** exclui.

### Status codes para memorizar

- **200:** sucesso.
- **201:** criado.
- **400:** requisição inválida.
- **404:** recurso não encontrado.
- **500:** erro interno do servidor.

### Comandos do Express para memorizar

```javascript
req.params.id
```

Obtém o parâmetro de rota.

```javascript
req.query.status
```

Obtém o query parameter.

```javascript
req.body
```

Obtém os dados enviados no corpo da requisição.

```javascript
res.status(200).json(dados);
```

Define o status HTTP e envia uma resposta JSON.

```javascript
veiculos.find(v => v.id === id);
```

Procura um veículo pelo ID.

```javascript
veiculos.findIndex(v => v.id === id);
```

Retorna o índice do veículo ou `-1` quando ele não existe.

```javascript
veiculos.push(novoVeiculo);
```

Adiciona um veículo à lista.

```javascript
veiculos.splice(index, 1);
```

Remove um veículo da lista.

---

## 📤 12. GitHub e entrega

Depois de testar os arquivos, envie as alterações para o GitHub.

### Passo 1 — Acessar a pasta do projeto

```bash
cd ~/binario_tech
```

### Passo 2 — Conferir as alterações

```bash
git status
```

### Passo 3 — Adicionar os arquivos

```bash
git add aula04/frota_api.js aula04/teste_crud.sh aula04/crud_result.log
```

Se o README estiver na raiz do projeto, adicione-o também:

```bash
git add README.md
```

Se estiver dentro da pasta `aula04`, utilize:

```bash
git add aula04/README.md
```

### Passo 4 — Criar o commit

```bash
git commit -m "Adiciona exercicios praticos da aula 04"
```

### Passo 5 — Enviar para o GitHub

```bash
git push origin main
```

### Passo 6 — Conferir os arquivos no GitHub

Acesse seu repositório pelo navegador e confirme se os arquivos estão presentes.

- `frota_api.js`
- `teste_crud.sh`
- `crud_result.log`
- `README.md`

### Passo 7 — Entregar no Google Classroom

Conforme as orientações do professor:

1. Acesse o repositório no GitHub.
2. Baixe `frota_api.js`, `teste_crud.sh` e `crud_result.log`.
3. Copie o link do repositório.
4. Tire um print do terminal mostrando a execução.
5. Anexe os três arquivos, o link e o print na atividade do Classroom.

---

## ✅ Conclusão

Nesta aula, foi construída uma API RESTful de gerenciamento de veículos utilizando Node.js e Express. Foram trabalhados os métodos HTTP, os parâmetros de rota, os query parameters, a validação de payloads e os códigos de status.

Também foi criado um script Bash para automatizar operações CRUD e registrar os resultados em um arquivo de log.

**Projeto desenvolvido para fins educacionais — Programação Back-End 1 (PBE1), Aula 04, Consultoria Binario Tech.**


•
Permission denied no script: execute chmod +x testar_telemetria.sh.

•
A rota Volvo retorna 404: confira se o bloco da rota foi salvo em telemetria.js, antes de app.listen(... ), e reinicie o servidor.

