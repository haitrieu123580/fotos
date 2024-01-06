import { Request, Response, Router } from "express";
import AuthController from "../../controllers/auth/AuthController";
import isValidRequest from "../../middleware/ValidRequest";
import SignUpRequest from "../../requests/auth/SignUpRequest";
import SignInRequest from "../../requests/auth/SignInRequest";

const router = Router();
const authController = new AuthController();

router.post('/sign-in', [isValidRequest(SignInRequest)], authController.sign_in);

router.post('/sign-up', [isValidRequest(SignUpRequest)], authController.sign_up);

export default router;
