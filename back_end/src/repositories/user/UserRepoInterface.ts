import { Request } from "express";
import { User } from "../../entity/User";
interface UserRepoInterface {

    getUser: (username: String) => Promise<any>;

    isExistedEmail: (email: string) => Promise<boolean>;

    createUser: (data: any) => Promise<User>;
}
export default UserRepoInterface;