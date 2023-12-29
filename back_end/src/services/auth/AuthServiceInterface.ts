import { Request } from "express";
interface AuthServiceInterface {
    login: (req: Request) => Promise<null>;
}
export = AuthServiceInterface;