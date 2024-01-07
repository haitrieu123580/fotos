import { Container, Service, Inject } from "typedi";
import { Request } from "express";
import AuthServiceInterface from "./AuthServiceInterface";
import AuthRepositoryInterface from "repositories/auth/AuthRepoInterface";
import AuthRepository from "../../repositories/auth/AuthRepo"
import UserRepoInterface from "repositories/user/UserRepoInterface";
import UserRepo from "../../repositories/user/UseRepo";
import SignInResponse from "../../resources/auth/SignInResponse";

@Service()
class AuthService implements AuthServiceInterface {

    private authRepo: AuthRepositoryInterface;
    private userRepo: UserRepoInterface;
    constructor() {
        this.authRepo = Container.get(AuthRepository);
        this.userRepo = Container.get(UserRepo);
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
            const isExistedEmail = await this.userRepo.isExistedEmail(req.body.email)
            if (isExistedEmail) {
                const newUser = await this.userRepo.createUser(req.body)
                return { message: "Created" }
            }
            else {
                return { message: "Email Existed!" }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthService;
