import { Container, Service, Inject } from "typedi";
import { Request } from "express";
import dotenv from 'dotenv'
import AuthServiceInterface from "./AuthServiceInterface";
import AuthRepositoryInterface from "../../repositories/auth/AuthRepoInterface";
import AuthRepository from "../../repositories/auth/AuthRepo"
import UserRepoInterface from "../../repositories/user/UserRepoInterface";
import UserRepo from "../../repositories/user/UseRepo";
import SignInResponse from "../../resources/auth/SignInResponse";
import { hasingPassword, comparePassword } from "../../helper/HashingPassword";
import jwt from 'jsonwebtoken';
dotenv.config();
@Service()
class AuthService implements AuthServiceInterface {

    private userRepo: UserRepoInterface;
    constructor() {
        this.userRepo = Container.get(UserRepo);
    }

    public sign_in = async (req: Request): Promise<any> => {
        try {
            const userData = await this.userRepo.getUserByUsername(req.body.username);
            if (userData) {
                if (comparePassword(req.body.password, userData.password)) {
                    const access_token = jwt.sign({
                        id: userData.id,
                        username: userData.username
                    }, String(process.env.JWT_SECRET), {
                        expiresIn: String(process.env.TOKEN_EXPIRE_TIME),
                        algorithm: "HS256"
                    });
                    const refresh_token = jwt.sign({
                        id: userData.id,
                        username: userData.username
                    }, String(process.env.JWT_SECRET), {
                        expiresIn: String(process.env.REFRESH_TOKEN_EXPIRE_TIME),
                        algorithm: "HS256"
                    });
                    return { access_token, refresh_token, exprires_access_token: "1d" }
                }
            }
            return null
        } catch (error: any) {
            console.log(error)
            throw error;
        }
    };

    public sign_up = async (req: Request): Promise<any> => {
        try {
            const isExistedEmail = await this.userRepo.isExistedEmail(req.body.email)
            if (isExistedEmail) {
                return { message: "Email Existed!" }
            }
            else {
                const newUser = await this.userRepo.createUser(req.body)
                return { message: "Created" }
            }
        } catch (error) {
            console.log(error)
        }
    }

    public me = async (data: any): Promise<any> => {
        try {
            const id = data.user.id;
            const user = await this.userRepo.me(String(id))
            return user;
        } catch (error) {

        }
    }
}

export default AuthService;
