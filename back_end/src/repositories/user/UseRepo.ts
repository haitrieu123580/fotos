import UserRepoInterface from "./UserRepoInterface";
import { User } from '../../entity/User';
import { AppDataSource } from "../../data-source"
import { Service } from "typedi";
import SignUpRequest from "../../requests/auth/SignUpRequest";
import { hasingPassword, comparePassword } from "../../helper/HashingPassword";
@Service()
class UserRepo implements UserRepoInterface {
    private userDataSource = AppDataSource.getRepository(User)

    getUserByUsername = async (username: string): Promise<any> => {
        const result = await this.userDataSource.findOne(
            {
                where: {
                    username: username
                }
            }
        )
        return result;
    };

    isExistedEmail = async (email: string): Promise<boolean> => {
        const user = await this.userDataSource.find({
            where: {
                email: email
            }
        })
        if (user.length) {
            return true;
        }
        return false;
    }

    createUser = async (data: any): Promise<User> => {
        const user = new User();
        user.email = data.email;
        user.username = data.username;
        const { password } = hasingPassword(String(data.password))
        user.password = password;
        await this.userDataSource.save(user)
        return user;
    }

    me = async (id: string): Promise<User | null> => {
        const result = await this.userDataSource.findOneBy({ id: id })
        return result;
    }
}

export default UserRepo;