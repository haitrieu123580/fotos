import { Router } from "express";
import { Request, Response } from "express";
import verifyToken from "../../middleware/VerifyToken";
import UploadAvatarController from '../../controllers/user/UploadAvatarController';

const uploadAvatarController = new UploadAvatarController();
const router = Router();

router.post('/upload-avatar', [verifyToken], uploadAvatarController.uploadAvatar)

export = router