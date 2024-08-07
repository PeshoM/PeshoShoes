import { Router } from "express";
import fetchParamsProductsController from "../controllers/fetchParamsProducts.controller";

const router: Router = Router();

router.get( "/fetchParamsProducts", fetchParamsProductsController.Get);

export default router;