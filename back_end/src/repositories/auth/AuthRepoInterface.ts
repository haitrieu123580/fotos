import { Request } from "express";
interface AuthRepositoryInterface {
    sign_in: (data: any) => Promise<any>;
}
export = AuthRepositoryInterface;