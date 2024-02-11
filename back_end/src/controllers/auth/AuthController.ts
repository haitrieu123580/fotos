import AuthServiceInterface from "../../services/auth/AuthServiceInterface";
import { Request, Response } from "express";
import Container from 'typedi';
import AuthService from "../../services/auth/AuthService";
// import { BadRequestError, AuthFailureError } from "../../core/ApiError";
import { SuccessResponse, AuthFailureResponse, InternalErrorResponse } from "../../core/ApiResponse";
class AuthController {
    private authService: AuthServiceInterface;
    constructor() {
        this.authService = Container.get(AuthService)
    }
    sign_in = async (req: Request, res: Response): Promise<any> => {
        try {
            const data = await this.authService.sign_in(req);
            if (data) {
                return new SuccessResponse('Login Success', data).send(res);
            }
            else {
                return new AuthFailureResponse('Invalid Credentials').send(res);
            }
        } catch (error) {
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }
    sign_up = async (req: Request, res: Response) => {
        try {
            const result = await this.authService.sign_up(req);
            return res.json({ data: result.message })
        } catch (error) {
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }
    me = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.me(req)
            return res.json({ Data: user })
        } catch (error) {
            return new InternalErrorResponse('Internal Server Error').send(res);
        }
    }
    get_token = async (req: Request, res: Response) => {
        try {
            const data = await this.authService.get_access_token_by_refresh_token(req);
            return res.json(data);
        } catch (error) {

        }
    }

}
export default AuthController;