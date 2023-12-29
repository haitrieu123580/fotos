import dotenv from 'dotenv'
// import { IMain, IDatabase } from 'pg-promise';
// import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import { Sequelize } from 'sequelize';


dotenv.config();

const sequelize = new Sequelize(
    String(process.env.DB_DATABASE),
    String(process.env.DB_USERNAME),
    String(process.env.DB_PASSWORD),
    {
        host: String(process.env.DB_HOST),
        dialect: 'postgres',
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
    }
);
export = sequelize;
