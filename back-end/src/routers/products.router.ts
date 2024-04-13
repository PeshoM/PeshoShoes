import { Router } from "express";
import productsController from "../controllers/products.controller";
import upload from "../middlewares/handlePicUploads.middleware";

const router: Router = Router();

router.post("/products", upload.any(), productsController.Post);

router.get("/products", productsController.Get);

export default router;
