import { Router } from "express";
import clickedNavigationUrlController from "../controllers/clickedNavigationUrl.controller";

const router: Router = Router();

router.get( "/clickedNavigationUrl", clickedNavigationUrlController.Get);

export default router;