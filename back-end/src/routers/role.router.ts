import express from "express";
const router = express.Router();
const roleController = require("../controllers/role.controller");
import { handleAdminReq } from "../middlewares/handleAdmin.middleware";
//@ts-ignore
router.post("/role", handleAdminReq, roleController.Post);

export default router;