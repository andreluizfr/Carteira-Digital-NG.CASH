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

## Entidades

## Rotas

As rotas foram definidas baseadas nos serviços pedidos feitas pela empresa
### /user/createUser (post)
Recebe um JSON no formato {username: string, password: string}. Se o username tiver pelo menos 3 caracteres, e o password possuir pelo menos 8 caracteres, uma letra maíuscula, uma letra minúscula e um número. Retornará uma mensagem de sucesso, caso contrário, retornará mensagem de erro.

### /user/getUser (get)
Se o token estiver presente no header da request, retornar um objeto do tipo da entidade User e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.

### /user/login (post)
Recebe um JSON no formato {username: string, password: string}. Se as informações combinarem com algum usuário salvo no BD, retornará um token com payload contendo seu username e uma mensagem de sucesso. Caso contrário, retornará apenas uma mensagem de erro.


get('/getAccount'

post('/transfer')

get('/getTransactions')

docker-compose up -d
docker-compose build --no-cache
docker-compose down
npm run dev
npm start
