import AuthServiceInterface from "services/auth/AuthServiceInterface";
import { Request, Response } from "express";
class AuthController {
    private authService: AuthServiceInterface;
    constructor() {

    }
    sign_in = async (req: Request) => {
        return { Data: "OK" }
    }

}
export = AuthController;