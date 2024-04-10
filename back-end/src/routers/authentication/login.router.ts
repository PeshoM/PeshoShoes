import express from "express";
const router = express.Router();
const users = require("../../schemas/users.schema");
const loginController = require("../../controllers/authentication/login.controller");

router.post("/login", loginController.Post);

module.exports = router;
