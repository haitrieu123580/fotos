import { Request, Response, Router } from "express";
import asyncHandler from 'express-async-handler';
import AuthController from "../../controllers/auth/AuthController";

const router = Router();
const authController = new AuthController();

router.get('', (req: Request, res: Response) => {
    res.status(200).json("hello world");
});

router.post('/sign-in', asyncHandler(async (req: Request, res: Response) => {
    await authController.sign_in(req);
}));

export default router;
