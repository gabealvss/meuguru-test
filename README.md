# Teste Prático - Back End Engineer - Meu Guru
## Primeiramente, olá!

Olá! Este é o repositório público do teste realizado para a vaga de Back-End SWE na Meu Guru.
Além de um teste, espero que este repo sirva como objeto de estudo para outros devs que queiram compreender mais sobre APIs RESTful em Node.JS, utilizando TypeScript e tecnologias como Prisma, Jest, Docker, PostgreSQL e buscando implementar as melhores práticas possíveis (SOLID, TDD e etc..).

## Glossário

 - [Instalação](#install)
 - [Uso](#usage)
 - [Headers, Verbos e Status Codes](#design)
 - [Endpoints e Exemplos](#endpoints)

## <a name="install"></a>Instalação

O processo de instalação da aplicação é simples. Utilize seu gerenciador de pacotes favorito (npm/yarn, etc...) para instalação das dependências.
Após a instalação dos pacotes, utilize o script **migrate:deploy** para executar a migração em seu Banco de Dados configurado nas variáveis de ambiente (vide **.env.example**).

Exemplo:

    yarn migrate:deploy

## <a name="usage"></a>Uso

Existem alguns scripts pré-definidos para ajudar no processo de manutenção, deploy e desenvolvimento da aplicação. Como exemplo, vamos ver o caso de uso com o Yarn:

### Dev Ambient
O script **dev** inicia um servidor específico para ser utilizado durante o desenvolvimento, utilizando o **Nodemon**.

    yarn dev

### Tests
Para rodar os testes unitários/e2e com o Jest, existem dois scripts pré-definidos:

    yarn test
    yarn test:watch

### Linter
Existem dois scripts responsáveis pela organização e checagem de código. O script lint é responsável por rodar o ESLint nas pastas/arquivos alvo, já o prettify é responsável por reorganizar o design de código de uma forma padrão. providenciando uma checagem completa para um código limpo de problemas.

    yarn lint
    yarn prettify
    
### Deploy
Existem também alguns scripts principais criados para facilitar o deploy e a instalação de novos ambientes:

    yarn migrate
    yarn migrate:deploy
    yarn build
    yarn start

## <a name="design"></a>Headers, Verbos e Status Codes
A API aceita primordialmente um tipo de Content-Type: JSON.

Tenha certeza de definir corretamente os Headers antes de qualquer requisição. Ex.:

    Content-Type: application/json

A API também busca utilizar o uso correto dos verbos HTTP para cada endpoint:

 - `POST` é utilizado para criar recursos.
 - `GET` é utilizado para retornar recursos.
 - `PATCH` é utilizado para atualizar recursos.
 - `DELETE` é utilizado para remover recursos.
 
 ### Códigos de Status
 No layout da API, temos alguns códigos de Status:
 
 - Tentar realizar uma requisição com parâmetros incompletos resultará num código de erro `400`.
 - Quando houver um erro interno de processamento, a aplicação retornará um erro `500` com uma mensagem detalhada do problema.
 - Endpoints com o objetivo de criação de recursos sempre retornarão o código `201` quando executados com sucesso.
 - Endpoints com o objetivo de retorno, atualização e remoção de recursos sempre retornarão o código `200` quando executados com sucesso.

## <a name="endpoints"></a>Endpoints
Para testar os Endpoints você deve executar a aplicação na sua máquina utilizando o comando `start` ou o `dev`.

Para um melhor controle de versionamento, todas as requisições devem ser feitas partindo do diretório `/api/v1/`. Ex.: `POST http://localhost:5000/api/v1/user`

Caso queira realizar os testes utilizando aplicações HTTP como o Insomnia, existe um arquivo no diretório raiz chamado `insomnia.json`, basta importa-lo na aplicação para ter acesso a um mock de todas as requests e endpoints da API.

### POST /user
`POST http://localhost:5000/api/v1/user`

Este endpoint é responsável por lidar com a criação de novos Usuários no Banco de Dados.

**Payload:**

 - `name`: o nome do novo usuário.
 - `email`: o e-mail do novo usuário (deve ser único). 
 - `password`: a senha do novo usuário (mínimo de 8 caracteres).

### GET /user
`GET http://localhost:5000/api/v1/user`

Este endpoint é responsável por retornar os Usuários da aplicação, limitando a 7 usuários por requisição/página.

**Params:**
Existem alguns parametros opcionais que podem ser passados através do url (utilizando ? e &) para filtrar e paginar os resultados.

 - `page`: número da página, partindo da página 0 (primeira página).
 - `name`: - opcional - filtra os usuários por nome. 
 - `email`: - opcional - busca um usuário por um e-mail específico.
 - `id`: - opcional - busca um usuário por um ID específico.

### PATCH /user
`PATCH http://localhost:5000/api/v1/user`

Este endpoint é responsável por lidar com atualização dos dados dos Usuários.

**Payload:**

 - `id`: o ID do usuário a ser alterado, campo obrigatório.
 - `name`: - opcional - o novo nome do usuário.
 - `email`: - opcional - o novo e-mail do usuário.
 - `password`: - opcional - a nova senha do usuário.

Em casos de sucesso, o endpoint retornará um objeto Usuário contendo as informações do Usuário recém atualizado.

### DELETE /user
`DELETE http://localhost:5000/api/v1/user`

Este endpoint é responsável por remover um Usuário presente no Banco de Dados.

**Payload:**

 - `id`: o ID do usuário a ser removido, campo obrigatório.
