import { Request } from "express";
import { Service } from "typedi";
import UserServiceInterface from "./UserServiceInterface";
@Service()
class UserService implements UserServiceInterface {
    upload_avatar: (req: Request) => Promise<any>;
}
export default UserService;