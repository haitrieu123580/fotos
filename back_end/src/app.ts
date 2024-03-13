import 'reflect-metadata';
import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieSession from 'cookie-session';
import authRoutes from './routers/auth/index';
import userRouter from './routers/user/index';
import passportRouter from './routers/passport/index';
import { AppDataSource } from "./data-source"
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import './services/oauth/Passport';
import passport from 'passport';
import session from 'express-session';
dotenv.config();

const app: Application = express();

// Database connection
AppDataSource.initialize().then(async () => {
    console.log("Database connection established successfully.");
}).catch(error => console.log(error))


// Swagger
const file = fs.readFileSync(__dirname + '/docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);


// Swagger
try {
    const file = fs.readFileSync(path.resolve(__dirname, '../docs/swagger.yaml'), 'utf8')
    const swaggerDocument = YAML.parse(file);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (error) {

}
// Passport
app.use(session({
    secret: String(process.env.SESSION_KEY),
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', authRoutes)
app.use('/api/user', userRouter)
app.use('/passport', passportRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 8000}`)
})