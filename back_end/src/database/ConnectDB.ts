import dotenv from 'dotenv'
import { IMain, IDatabase } from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
dotenv.config();

const pgp: IMain = require('pg-promise')();

const connectionParameters: IConnectionParameters = {
    host: String(process.env.DB_HOST),
    user: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
};

const db: IDatabase<any> = pgp(connectionParameters);

export default db;
