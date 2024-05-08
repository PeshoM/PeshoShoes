import { Router } from "express";
import checkoutController from "../controllers/checkout.controller";

const router: Router = Router();

router.post( "/checkout", checkoutController.Post);

export default router;