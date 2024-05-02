import { Router } from "express";
import fetchParamsDataController from "../controllers/fetchParamsData.controller";

const router: Router = Router();

router.get( "/fetchParamsData", fetchParamsDataController.Get);

export default router;