import { Router } from "express";
import fetchProductController from "../controllers/fetchProduct.controller";

const router: Router = Router();

router.get( "/fetchProduct", fetchProductController.Get);

export default router;