const express = require("express");
const router = express.Router();
const products = require("../schemas/products.schema");
const productsController = require("../controllers/products.controller");
const handleAdminMiddleware = require("../middlewares/handeAdmin.middleware");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads/");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });

router.post("/products", upload.any(), productsController.Post);

router.get("/products", productsController.Get);

module.exports = router;
