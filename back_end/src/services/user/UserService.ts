import { Request } from "express";
import { Service, Container } from "typedi";
import UserServiceInterface from "./UserServiceInterface";
import UserRepoInterface from "../../repositories/user/UserRepoInterface";
import UserRepo from "../../repositories/user/UseRepo";
@Service()
class UserService implements UserServiceInterface {
    private userRepo: UserRepoInterface;
    constructor() {
        this.userRepo = Container.get(UserRepo);
    }
    public upload_avatar = async (user: any, imagePath: string): Promise<any> => {
        try {
            const result = this.userRepo.updateAvatar(String(user.id), imagePath)
            return result;
        } catch (error) {
            console.log(error)
        }
    }

}
export default UserService;