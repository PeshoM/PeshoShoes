import { Router } from "express";
import searchInputController from "../controllers/searchInput.controller";

const router: Router = Router();

router.post("/searchInput", searchInputController.Post);

export default router;