### START DO PROJETO 

**clonar o projeto**
```sh 
git clone git@github.com:augustogehrke/DeliveryMuchTest.git AugustoGehrke-Test
```

**Instalar a cli do adonis**
```sh 
npm i -g @adonisjs/cli
```

**Instalar as dependências do projeto**
```sh 
npm install
```

**Criar o arquivo das variáveis de ambiente**
```sh
cp .env.example .env
```

**Observações:**
- O arquivo `.env` pode ser criado manualmente;
- Necessário preencher o arquivo `.env` criado anteriormente com todas as variáveis de ambiente, conforme definidas no arquivo `.env.example`;
- Foi adicionado configurações default, portanto, é necessário somente preencher a variável `API_GIPHY_KEY` com a chave da api giphy. A chave não foi fornecida devido a ser informação confidencial. Para criar a chave é necessário se registar e criar um app na [Giphy](https://developers.giphy.com/docs/api#quick-start-guide).

**Criar a chave única do projeto**
```sh
adonis key:generate
```

**Iniciar o servidor em modo de desenvolvimento**
```sh 
adonis serve --dev
```

O projeto iniciará localmente na porta 3333

Caso necessário, a porta pode ser trocada no arquivo `.env`

**Para subir a api em um container, verifique a sessão Usando Docker**

### PADRÃO DE DESENVOLVIMENTO

O projeto faz uso do eslint, seguindo o padrão [Standard](https://standardjs.com/).

**Comando úteis:**

```sh
npm run lint
```
Verifica se todo o projeto está seguindo o padrão definido, caso não, informa quais os problemas encontrados.

```sh 
npm run lint-fix
```
Verifica se todo o projeto está seguindo o padrão definido, caso não, realiza a correção automática do que for possível e informa quais problemas ainda precisam ser resolvidos.


### REQUISIÇÃO

Informações necessárias no cabeçalho das requisições para padronização das requisições e respostas em formato JSON.

* **Content-Type**: application/json
* **Accept**: application/json

### ROTAS

**[GET] /recipes**: Busca de receitas conforme os ingredientes fornecidos.

* i - String - ingredientes para realizar 

**Request:**
```
{
  i: onions,garlic
}
```

**Response:**
```
{
  "keywords": [
    "onions",
    "garlic"
  ],
  "recipes": [
    {
      "title": "Steamed Mussels I",
      "ingredients": [
        "garlic",
        "mussels",
        "onions"
      ],
      "link": "http://allrecipes.com/Recipe/Steamed-Mussels-I/Detail.aspx",
      "gif": "https://media2.giphy.com/media/3otPosCSQAWOUCZ7J6/giphy.gif?cid=c0fb8eaa173d53247aa0ed5f79be9eaf26ffd2783e83df32&rid=giphy.gif"
    },
    {
      "title": "Braised Beef and Onions",
      "ingredients": [
        "allspice",
        "garlic",
        "onions"
      ],
      "link": "http://www.epicurious.com/recipes/food/views/Braised-Beef-and-Onions-232969",
      "gif": "https://media2.giphy.com/media/l2JhBOWhKWH7n4c6I/giphy.gif?cid=c0fb8eaa41ae92890ee50bb3cc257f58cdc9834f6399c230&rid=giphy.gif"
    }
  ]
}
```

### PADRÃO DE ERROS

Caso algo não ocorra como o esperado, existe retorno padrão da api.

Exemplo:
```
{
  "error": {
    "message": "Please enter an ingredient",
    "name": "IncorretParams",
    "status": 400
  }
}
```

### TESTES UNITÁRIOS

O projeto possui testes unitários. Para sua execução é necessário alguns passos.

**Criar o arquivo `.env.testing` responsável pelas variáveis dos testes**
```sh
cp .env.testing.example .env.testing
```

**Observações:**
- O arquivo `.env.testing` pode ser criado manualmente;
- Necessário preencher o arquivo `.env.testing` criado anteriormente com todas as variáveis de ambiente, conforme definidas no arquivo `.env.testing.example`
- As variáveis de testes (`.env.testing`) são mescladas juntos no `.env`;
- Foi adicionado configurações default, portanto, é necessário somente preencher a variável `API_GIPHY_KEY` com a chave gerada anteriormente ou criar uma nova.

**Execução dos testes**

```sh
adonis test
```
Executa todos os testes do projeto

```sh
adonis test -f providers.spec.js
```
Executa apenas um arquivo de testes específico

**Testes implementados**

**test/unit/providers**
* Verificação se a API Recipe Puppy está online
* Verificação se a API Giphy está online

**test/unit/recipes**
* Verifica se a função getGif está retornando um link de um gif
* Verifica se a função formatIngredients está formatando corretamente em array os ingredientes recebidos
* Verifica se a rota recipes [GET] está retornando a estrutura conforme solicitado

### Usando Docker

**Necessário ter instalado o Docker e do Docker Compose**

Altere no arquivo `.env` a variável `HOST` para `0.0.0.0`, tornando assim a api acessível externamente

**Comando para subir a api:** 

```sh
docker-compose up --build -d
```

Será criado um container com a api rodando na porta 3333 e outro container rodando o nginx para realizar o proxy reverso. Sendo assim a api pode ser consumida localmente na porta padrão.

Exemplo de chamada com a api subida via container: http://127.0.0.1/recipes?i=onions,garlic
