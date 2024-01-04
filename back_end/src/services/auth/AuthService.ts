import { Container, Service, Inject } from "typedi";
import { Request } from "express";
import AuthServiceInterface from "./AuthServiceInterface";
import AuthRepositoryInterface from "repositories/auth/AuthRepoInterface";
@Service()
class AuthService implements AuthServiceInterface {

    private authService: AuthRepositoryInterface;
    constructor() {
        // this.authService = l
    }

    public sign_in = async (req: Request): Promise<any> => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return {};
        } catch (error: any) {
            // Handle errors
            throw error;
        }
    };
}

export default AuthService;
