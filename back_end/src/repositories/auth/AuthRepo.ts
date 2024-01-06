import AuthRepositoryInterface from "./AuthRepoInterface";
import { Service } from "typedi";

@Service()
class AuthRepository implements AuthRepositoryInterface {
    getUser = async (username: String): Promise<any> => {
        console.log(username)
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
            user: "abc",
            password: "hashing"
        };
    };
}
export default AuthRepository;