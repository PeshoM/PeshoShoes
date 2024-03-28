const express = require('express');
const router = express.Router();
const searchInputController = require("../controllers/searchInput.controller");
const products = require("../schemas/products.schema");

router.post("/searchInput", searchInputController.Post);

module.exports = router;