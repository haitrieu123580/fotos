import { Request } from "express";
interface AuthServiceInterface {
    sign_in: (req: Request) => Promise<any>;
}
export = AuthServiceInterface;