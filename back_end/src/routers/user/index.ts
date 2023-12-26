import { Router } from "express";
import { Request, Response } from "express";
import User from "../../models/User";
const router = Router();
router.get('', async (req: Request, res: Response) => {
    try {
        const data = await User.findAll();
        return res.status(200).json({ data: data });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})
export = router