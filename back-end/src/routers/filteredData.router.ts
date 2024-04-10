import express from "express";
const router = express.Router();
const products = require("../schemas/products.schema");
const filteredDataController = require("../controllers/filteredData.controller");

router.post("/filteredData", filteredDataController.Post);

module.exports = router;
