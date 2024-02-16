import 'reflect-metadata';
import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import authRoutes from './routers/auth/index';
import userRouter from './routers/user/index';
import { AppDataSource } from "./data-source"
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
dotenv.config();

// Database connection
AppDataSource.initialize().then(async () => {
    console.log("Database connection established successfully.");
}).catch(error => console.log(error))


// Swagger
const file = fs.readFileSync(__dirname + '/docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const app: Application = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 8000}`)
})