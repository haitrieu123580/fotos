import { User } from "../../entity/User";
import { Request } from "express";
interface AuthServiceInterface {
    sign_in: (req: Request) => Promise<any>;
    sign_up: (req: Request) => Promise<any>;
    me: (req: Request) => Promise<User | any>;
}
export = AuthServiceInterface;