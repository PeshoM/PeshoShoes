import { Request, Response } from "express";
const users = require("../../schemas/users.schema");
const jwt = require("jsonwebtoken");
import env from "dotenv";
env.config();

const Post = async (req: Request, res: Response) => {
  const user = await users.findOne({ username: req.body.username });
  if (user) {
    const result = req.body.password === user.password;
    if (result) {
      let key = { username: req.body.user, role: req.body.role };
      const token = await jwt.sign(
        { key },
        process.env.SECRET_KEY,
        { algorithm: process.env.HASH_ALGORITHM },
        { expiresIn: process.env.EXPIRATION }
      );
      res.status(200).json({
        status: "success",
        token: {
          token,
        },
      });
    } else res.status(404).send("Status: Not Found");
  }
  res.status;
};

module.exports = {
  Post,
};
