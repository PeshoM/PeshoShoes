import { Router } from "express"
import roleController from "../controllers/role.controller";
import handleAdminReq from "../middlewares/handleAdmin.middleware";

const router: Router = Router();

//@ts-ignore
router.post("/role", handleAdminReq, roleController.Post);

export default router;