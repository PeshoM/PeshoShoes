const express = require("express");
const router = express.Router();
const users = require("../schemas/users.schema");
const roleController = require("../controllers/role.controller");
const handleAdminMiddleware = require("../middlewares/handeAdmin.middleware");

router.post("/role", handleAdminMiddleware.handleAdminReq, roleController.Post);

module.exports = router;
