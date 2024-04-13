import { Router } from "express";
import registerController from "../../controllers/authentication/register.controller";

const router: Router = Router();

router.post("/register", registerController.Post);

export default router;