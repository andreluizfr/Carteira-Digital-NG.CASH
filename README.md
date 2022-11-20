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
4. LocalStorage API
3. React
4. React-Router-Dom (roteamento de páginas)
5. Axios (consumo da API)


Docker
Postman
Git

## Entidades

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

### /account/getTransactions (post) (requer token)
Recebe um JSON no formato {dateFilter: string, typeFilter: string} e se um token válido estiver presente no header da request, retornará uma lista contendo todas as transações em que o usuário participou filtradas por data e tipo em forma de lista do tipo da entidade Transaction e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.


docker-compose up -d
docker-compose build --no-cache
docker-compose down
npm run dev (no server)
npm start ()
