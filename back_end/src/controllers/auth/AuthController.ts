import AuthServiceInterface from "../../services/auth/AuthServiceInterface";
import { Request, Response } from "express";
import Container from 'typedi';
import AuthService from "../../services/auth/AuthService";
class AuthController {
    private authService: AuthServiceInterface;
    constructor() {
        this.authService = Container.get(AuthService)
    }
    sign_in = async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await this.authService.sign_in(req);
            if (data) {
                return res.status(200).json(data)
            }
            return res.status(500).json({ message: "Error" })
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
    me = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.me(req)
            return res.json({ Data: user })
        } catch (error) {

        }
    }

}
export default AuthController;