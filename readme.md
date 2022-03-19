## Oq é uma API ?
- Application Programming Interface
- Interface de programação de aplicações
- Intermediario de um sistema ou outro sistema, ou servidor entre um aplicativo, ou intermediario de um projeto a outro projeto
- Retorno  Json ou XML

## REST E RESTFUL
- Webservices - Serviços da web
- REST é um padrão de API 
- Restful é o sistema que usa o padrão
- O rest precisa ter uma url(wwww) metodo(GET) e os parametros(/api/users) ou complementos(/api/user/10)
> GET pegar informações
> PUT atualizar informação
> POST criar ou add informação nova
> DELETE apaga a informação


## INICIANDO
- npm init
- npm install dotenv express sequelize validator
- npm i mysql2
> Instalar os types
- tsc --init
- configurar o arquivo tsconfig.json
- instalando -D ou --save-dev é a mesma coisa
> Instalando os types
- npm install -D @types/express @types/node @types/sequelize @types/validator

## INSTALANDO O SERVIDOR
- criar arquivos server.ts dentro do src
> Inserir no server.ts
```
import express, { Request, Response} from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended:true}));

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'})
})
server.listen(process.env.PORT);
```
> Depois essa linha no add no package.json dentro do script
```
    "start-dev": "nodemon -e ts,json src/server.ts"
```
> Rodar o servidor
```
npm run start-dev
```
> Testar API
```
https://resttesttest.com/
```

> CORS
- Ele precisa ser liberado nos metodos POST PUT e outros menos o GET
```
npm install cors
npm install -D @types/cors

```
- Depois instalar o cors, iremos chamar ela dentro do server e chamar o cors dentro do server
```
server.use(cors())
```
- quando eu coloco apenas o codigo acima ele libera qualquer origin do cors ou colocando o *
```
server.use(cors({
    origin: '*'
}));
```
- Quando quiser apenas liberar acessa ao dominio segue o formato abaixo
```
server.use(cors({
    origin: 'https://uol.com.br'
}));
```
> PLANEJANDO UMA API

- CRUD DE CARRO
- POST/carros  - Criar um registro novo de carro
- GEST/carros - Listar todos os carros
- GET/carros/gol - Pegar apenas um carro
- PUT/carros/gol - Atualizar informações de um carro
- DELETE/carros/gol - Deletar um carro

## O PostgreSQL
- user: postgres
- senha: 1234
- porta: 5432

- Iremos criar o banco de dados com os dados

## CRIAÇÃO DO MODELS INSTANCES E CONTROLLERS
- Dentro do src criar três pastas models, instances e controllers
> No src/controllers/apiController.ts fica os metodos da api:
``` 
import { Request, Response } from "express";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const random = ( req: Request, res: Response) => {
    let nRandom = Math.floor(Math.random() * 10);
    res.json({ number: nRandom })
}

export const nome = (req: Request, res: Response) => {
    let nome: string = req.params.nome;
    res.json({nome: `Você enviou o nome ${nome}`})
}
```
> No src/instances/pg.ts fica a conexão com o banco de dados importando os dados do .env : 
```
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        dialect: 'mysql',
        port: parseInt(process.env.MYSQL_PORT as string)
    }
)
```
- No .env
```
PORT=4000

MYSQL_DB=cars
MYSQL_USER=root
MYSQL_PASSWORD=admin
MYSQL_PORT=3306
```

> No src/models iremos criar os types 
```
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface CarsInstance extends Model {
    id: number;
    carro: string;
    marca: string;
}

export const Cars = sequelize.define<CarsInstance>('Cars', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    carro: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'carros',
    timestamps: false
})
```
> Criando um create => res.status(201); 

## CRIANDO OS METODOS POST GET PUT DELETE




