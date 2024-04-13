import express from "express";
const router = express.Router();
const products = require("../schemas/products.schema");
import filteredDataController from "../controllers/filteredData.controller";

router.post("/filteredData", filteredDataController.Post);

export default router;