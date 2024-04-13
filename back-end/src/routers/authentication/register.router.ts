import express from "express";
const router = express.Router();
const users = require("../../schemas/users.schema");
const registerController = require("../../controllers/authentication/register.controller");

router.post("/register", registerController.Post);

export default router;