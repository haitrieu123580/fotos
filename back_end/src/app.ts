import express, { Express, Request, Response, Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database/ConnectDB'
// import cookieParser from 'cookie-parser';
import authRoutes from './routers/auth/index';
import userRouter from './routers/user/index';
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DBConnection();

app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on ${process.env.PORT || 8000}`)
})