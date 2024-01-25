import 'reflect-metadata';
import express, { Express, Request, Response, Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import authRoutes from './routers/auth/index';
import userRouter from './routers/user/index';
import { AppDataSource } from "./data-source"

dotenv.config();

AppDataSource.initialize().then(async () => {
    console.log("Database connection established successfully.");
}).catch(error => console.log(error))

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 8000}`)
})