# NG.CASH

## Tecnologias utilizadas

### Back-end
1. Express
2. Typescript
3. PostgreSQL
4. TypeORM
5. uuid (geração de id único para entidades)
6. bcrypt (Hashing da senha)
7. JsonWebToken (geração e validação de tokens)

### Front-end
1. HTML
2. CSS
3. Typescript
4. LocalStorage API (armazenar token)
3. React
4. React-Router-Dom (roteamento de páginas)
5. Axios (consumo da API)

### Para auxiliar no desenvolvimento
1. Docker (containerização da aplicação)
2. Postman (Para realizar testes à API)
3. Git (Versionamento da aplicação)

## Entidades
### User
Possui relacionamento One-To-One com Account
<img src="imagens/user-entity.png"/>

### Account
Apesar de estar em dois relacionamentos, o TypeORM não vê necessidade da declaração nessa entidade, pois já tem a declaração nas outras duas.
<img src="imagens/account-entity.png"/>

### Transaction 
Possui relacionamento Many-To-One com Account
<img src="imagens/transaction-entity.png"/>

## Rotas
As rotas foram definidas baseadas nos serviços pedidos feitas pela empresa

### /user/createUser (post)
Recebe um JSON no formato {username: string, password: string}. Se o username tiver pelo menos 3 caracteres, e o password possuir pelo menos 8 caracteres, uma letra maíuscula, uma letra minúscula e um número. Cadastrará o usuário no BD e retornará uma mensagem de sucesso e um token de acesso, caso contrário, retornará uma mensagem de erro.

### /user/login (post)
Recebe um JSON no formato {username: string, password: string}. Se as informações combinarem com algum usuário salvo no BD, retornará um token de acesso contendo seu username e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.

### /user/getUser (get) (requer token)
Se um token válido estiver presente no header da request, retornará um objeto do tipo da entidade User e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.

### /account/getAccount (get) (requer token)
Se um token válido estiver presente no header da request, retornará um objeto do tipo da entidade Account e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.

### /account/transfer (put) (requer token)
Recebe um JSON no formato {debitedUsername: string, creditedUsername: string, value: number} e se um token válido estiver presente no header da request, realizará a operação de transferência de valores de uma conta para a outra e retornará a transação criada em forma de objeto do mesmo tipo da entidade Transaction e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.

### /account/getTransactions (get) (requer token)
Recebe parâmetros por queries no url com padrão "getTransactions?dateFilter=0&&typeFilter=0". Se um token válido estiver presente no header da request, retornará uma lista contendo todas as transações filtradas, em forma de lista do tipo da entidade Transaction e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.

## Imagens finais
<img src="imagens/landing-page.png"/>
<img src="imagens/signup-page-0.png"/>
<img src="imagens/signup-page-1.png"/>
<img src="imagens/signup-page-2.png"/>
<img src="imagens/login-page.png"/>
<img src="imagens/home-page.png"/>
<img src="imagens/transfer-page.png"/>

## Iniciando aplicação através do Docker

Na raiz do projeto use o comando:
```
docker-compose build --no-cache
```
E em seguida:
```
docker-compose up -d
```
Para descer aplicação use:
```
docker-compose down
```
Para visualizar a aplicação web acesse http://localhost:3000/ .

## Iniciando aplicação para desenvolvimento

Para iniciar o servidor, entre na pasta server e instale as dependências com:
```
npm install
```
E em seguida use:
```
npm run dev
```

Para iniciar a aplicação web, entre na pasta web-app e instale as dependências com:
```
npm install
```
E em seguida use:
```
npm start
```
Para visualizar a aplicação web acesse http://localhost:3000/ .
