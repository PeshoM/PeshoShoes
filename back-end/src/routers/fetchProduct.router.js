const express = require('express');
const router = express.Router();
const products = require("../schemas/products.schema");
const fetchProductController = require("../controllers/fetchProduct.controller");

router.post( "/fetchProduct", fetchProductController.Post);

module.exports = router;