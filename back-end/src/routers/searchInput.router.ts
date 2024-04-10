import express from "express";
const router = express.Router();
const products = require("../schemas/products.schema");
const searchInputController = require("../controllers/searchInput.controller");

router.post("/searchInput", searchInputController.Post);

module.exports = router;
