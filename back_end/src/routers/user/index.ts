import { Router } from "express";
import { Request, Response } from "express";
import verifyToken from "../../middleware/VerifyToken";
const router = Router();

router.post('/upload-avatar',[verifyToken], )

export = router