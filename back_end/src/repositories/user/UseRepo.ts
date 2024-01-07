import UserRepoInterface from "./UserRepoInterface";
import { User } from '../../entity/User';
import { AppDataSource } from "../../data-source"
import { Service } from "typedi";
import SignUpRequest from "../../requests/auth/SignUpRequest";
import { hasingPassword, comparePassword } from "../../helper/HashingPassword";
@Service()
class UserRepo implements UserRepoInterface {
    private userDataSource = AppDataSource.getRepository(User)

    getUser = async (username: String): Promise<any> => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            user: "abc",
            password: "hashing"
        };
    };

    isExistedEmail = async (email: string): Promise<boolean> => {
        const user = await this.userDataSource.find({
            where: {
                email: email
            }
        })
        if (user) {
            return true;
        }
        return false;
    }

    createUser = async (data: any): Promise<User> => {
        const user = new User();
        user.email = data.email;
        user.username = data.username;
        const { salt, password } = hasingPassword(String(data.password))
        user.password = password;
        user.salt = salt;
        await this.userDataSource.save(user)
        return user;
    }
}

export default UserRepo;