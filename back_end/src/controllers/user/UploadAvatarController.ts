import { Request, Response } from "express";
import { Container, Inject } from 'typedi';
import UserService from "../../services/user/UserService";
import UserServiceInterface from "../../services/user/UserServiceInterface";
import S3Service from "../../services/s3/S3Service";
class UploadAvatarController {

    private userService: UserServiceInterface;
    private s3Service: S3Service;

    constructor() {
        this.userService = Container.get(UserService);
        this.s3Service = Container.get(S3Service);
    }

    uploadAvatar = async (req: Request, res: Response) => {
        // console.log(req.file)
        return {

        }
    }
}
export default UploadAvatarController;