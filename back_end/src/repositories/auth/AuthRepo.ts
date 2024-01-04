import AuthRepositoryInterface from "./AuthRepoInterface";

class AuthService implements AuthRepositoryInterface {
    sign_in = async (req: Request): Promise<any> => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {};
    };
}
export default AuthService;