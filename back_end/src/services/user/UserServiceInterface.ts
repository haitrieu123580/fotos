import { Request } from "express";

interface UserServiceInterface {
    upload_avatar: (req: Request) => Promise<any>;
}
export = UserServiceInterface;