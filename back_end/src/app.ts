import express, { Express, Request, Response, Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';

// import cookieParser from 'cookie-parser';
import authRoutes from './routers/auth/index';
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes)

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on ${process.env.PORT || 8000}`)
})