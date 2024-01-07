import AuthServiceInterface from "services/auth/AuthServiceInterface";
import { Request, Response } from "express";
import Container from 'typedi';
import AuthService from "../../services/auth/AuthService";
import SignInResponse from "../../resources/auth/SignInResponse";
class AuthController {
    private authService: AuthServiceInterface;
    constructor() {
        this.authService = Container.get(AuthService)
    }
    sign_in = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.authService.sign_in(req);
            res.json(data as SignInResponse);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    sign_up = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.sign_up(req);
            return res.json({ data: result.message })
        } catch (error) {

        }
    }

}
export default AuthController;