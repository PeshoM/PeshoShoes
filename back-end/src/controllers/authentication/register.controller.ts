import { Request, Response } from "express";
import { User } from "../../schemas/users.schema";
const jwt = require("jsonwebtoken");
import env from "dotenv";

env.config();

const Post = async (req: Request, res: Response) => {
  const secretKey: string = process.env.SECRET_KEY || "";
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.pass,
    role: req.body.role,
  });
  let key = { email: req.body.email };
  const token = await jwt.sign(
    { key },
    secretKey,
    { algorithm: process.env.HASH_ALGORITHM },
    { expiresIn: process.env.EXPIRATION }
  );
  await user.save();
  res.json({ message: "successfully registered", token });
};

export default { Post };
