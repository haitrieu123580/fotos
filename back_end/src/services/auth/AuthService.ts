import { Container, Service, Inject } from "typedi";
import { Request } from "express";
import dotenv from 'dotenv'
import AuthServiceInterface from "./AuthServiceInterface";
// import AuthRepositoryInterface from "../../repositories/auth/AuthRepoInterface";
// import AuthRepository from "../../repositories/auth/AuthRepo"
import UserRepoInterface from "../../repositories/user/UserRepoInterface";
import UserRepo from "../../repositories/user/UseRepo";
// import SignInResponse from "../../resources/auth/SignInResponse";
import { comparePassword } from "../../helper/HashingPassword";
import { genAccessToken, genRefreshToken, verifyToken } from "../../helper/JwtHelper";
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
                    const access_token = genAccessToken(userData.id, userData.username);
                    const refresh_token = genRefreshToken(userData.id, userData.username);
                    const result = await this.userRepo.storeToken(userData.id, refresh_token);
                    return { access_token, refresh_token, exprires_access_token: "1d" }
                }
            }
            return null
        } catch (error: any) {
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

    public get_access_token_by_refresh_token = async (req: Request): Promise<any> => {
        try {
            const refresh_token = req.body.refresh_token;
            if (!refresh_token) return { message: "Refresh token not found!" }

            // Check validity with an existing token
            const isExistingToken = await this.userRepo.isExistedToken(String(refresh_token));

            if (isExistingToken) {
                const user = verifyToken(refresh_token);

                const access_token = genAccessToken(user.id, user.username)

                const new_refresh_token = genRefreshToken(user.id, user.username)

                return { access_token, refresh_token: new_refresh_token, expires_access_token: "1d" };
            } else {
                return {
                    message: "Token not existed"
                };
            }
        } catch (error) {
            // Handle errors appropriately
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
