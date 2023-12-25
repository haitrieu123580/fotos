import dotenv from 'dotenv'
// import { IMain, IDatabase } from 'pg-promise';
// import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import { Sequelize } from 'sequelize';
import User from 'models/User'
import Like from 'models/Like'
import Picture from 'models/Picture'

dotenv.config();

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
        const user = new User();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


export = connectDB;
