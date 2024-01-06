import { Request } from "express";
import SignInResponse from "../../resources/auth/SignInResponse";

interface AuthServiceInterface {
    sign_in: (req: Request) => Promise<SignInResponse>;
    sign_up: (req: Request) => Promise<any>;
}
export = AuthServiceInterface;