import { Request, Response } from "express";
import { User } from "../../schemas/users.schema";
const jwt = require("jsonwebtoken");
import env from "dotenv";

env.config();

const Post = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const result = req.body.password === user.password;
    if (result) {
      let key = { email: req.body.email, role: user.role };
      const token = await jwt.sign(
        { key },
        process.env.SECRET_KEY,
        { algorithm: process.env.HASH_ALGORITHM },
        { expiresIn: process.env.EXPIRATION }
      );
      res.status(200).json({ token });
    } else {
      res.json(null);
    }
  } else {
    res.json(null);
  }
};

export default { Post };
