import dotenv from 'dotenv'
// import { IMain, IDatabase } from 'pg-promise';
// import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import { Sequelize } from 'sequelize';
dotenv.config();

// const pgp: IMain = require('pg-promise')();

// const connectionParameters: IConnectionParameters = {
//     host: String(process.env.DB_HOST),
//     user: String(process.env.DB_USERNAME),
//     password: String(process.env.DB_PASSWORD),
//     database: process.env.DB_DATABASE,
//     port: Number(process.env.DB_PORT),
// };

// const db: IDatabase<any> = pgp(connectionParameters);


const connectDB = async () => {
    const sequelize = new Sequelize(
        {
            host: String(process.env.DB_HOST),
            dialect: 'postgres',
            username: String(process.env.DB_USERNAME),
            password: String(process.env.DB_PASSWORD),
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
        }
    )

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


export = connectDB;
