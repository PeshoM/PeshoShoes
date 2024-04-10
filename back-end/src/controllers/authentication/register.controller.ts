import { Request, Response } from "express";
const users = require("../../schemas/users.schema");
const jwt = require("jsonwebtoken");
import env from "dotenv";

env.config();

const Post = async (req: Request, res: Response) => {
  const secretKey: string = process.env.SECRET_KEY || "";
  const user = new users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.pass,
    role: req.body.role,
  });
  let key = { firstName: req.body.firstName };
  const token = await jwt.sign(
    { key },
    secretKey,
    { algorithm: process.env.HASH_ALGORITHM },
    { expiresIn: process.env.EXPIRATION }
  );
  await user.save();
  res.json({ token });
};

module.exports = {
  Post,
};
