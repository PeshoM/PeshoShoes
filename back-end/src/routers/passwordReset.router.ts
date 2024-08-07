import { Router } from "express";
import passwordResetController from "../controllers/passwordReset.controller";

const router: Router = Router();

router.post("/passwordReset", passwordResetController.Post);

router.get("/passwordReset", passwordResetController.Get);

export default router;
