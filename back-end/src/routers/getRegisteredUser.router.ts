import { Router } from "express";
import getRegisteredUserController from "../controllers/getRegisteredUser.controller";

const router: Router = Router();

router.post("/getRegisteredUser", getRegisteredUserController.Post);

export default router;