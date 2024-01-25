import { Request } from "express";
import { User } from "../../entity/User";
interface UserRepoInterface {

    getUserByUsername: (username: string) => Promise<User>;

    isExistedEmail: (email: string) => Promise<boolean>;

    createUser: (data: any) => Promise<User>;

    me: (id: string) => Promise<User | null>;

    updateAvatar: (userId: string, imagePath: string) => Promise<boolean | null>;

}
export default UserRepoInterface;