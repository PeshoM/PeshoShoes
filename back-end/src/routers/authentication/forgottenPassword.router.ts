import { Router } from "express";
import forgottenPasswordController from "../../controllers/authentication/forgottenPassword.controller";

const router: Router = Router();

router.post( "/forgottenPassword", forgottenPasswordController.Post);

export default router;