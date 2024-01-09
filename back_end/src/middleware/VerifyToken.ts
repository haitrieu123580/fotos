import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
dotenv.config();
const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token: string = authHeader.split(" ")[1];
        jwt.verify(token, String(process.env.JWT_SECRET), (err, user) => {
            if (err) return res.status(404).json({ message: "Unauthorize" });
            (req as any).user = user;
            next();
        });
    } else {
        return res.status(404).json({ message: "Unauthorize" });
    }
};

export default verifyToken;