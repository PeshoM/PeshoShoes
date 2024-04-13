import { Router } from "express";
import loginController from "../../controllers/authentication/login.controller";

const router: Router = Router();

router.post("/login", loginController.Post);

export default router;