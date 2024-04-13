import { Router } from "express";
import filteredDataController from "../controllers/filteredData.controller";

const router: Router = Router();

router.post("/filteredData", filteredDataController.Post);

export default router;