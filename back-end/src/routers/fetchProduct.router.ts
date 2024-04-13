import { Router } from "express";
import fetchProductController from "../controllers/fetchProduct.controller";

const router: Router = Router();

router.post( "/fetchProduct", fetchProductController.Post);

export default router;