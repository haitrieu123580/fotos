import { Container, Service, Inject } from "typedi";
import { Request } from "express";
import AuthServiceInterface from "./AuthServiceInterface";
import AuthRepositoryInterface from "repositories/auth/AuthRepoInterface";
import AuthRepository from "../../repositories/auth/AuthRepo"
import SignInResponse from "../../resources/auth/SignInResponse";

@Service()
class AuthService implements AuthServiceInterface {

    private authRepo: AuthRepositoryInterface;
    constructor() {
        this.authRepo = Container.get(AuthRepository)
    }

    public sign_in = async (req: Request): Promise<SignInResponse> => {
        try {
            const userData = await this.authRepo.getUser(req.body.username);
            return new SignInResponse("access_token", "refresh_token");
        } catch (error: any) {
            // Xử lý lỗi
            throw error;
        }
    };

    public sign_up = async (req: Request): Promise<any> => {
        try {

        } catch (error) {

        }
    }
}

export default AuthService;
