import { User, user } from "../schemas/users.schema";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

const Post = async (req: Request, res: Response) => {
  let decoded: { key: { firstName: string }; iat: number } | null = null,
    key: string | null = req.body.key,
    secretKey: string = process.env.SECRET_KEY || "",
    registeredUser: user | null = null;
  console.log("local here");
  if (key && secretKey) {
    try {
      decoded = jwt.verify(key, secretKey);
      registeredUser = await User.findOne({
        firstName: decoded!.key.firstName,
      });
      console.log("curr logged user", registeredUser);
    } catch (error) {
      console.error("Error verifying JWT:", error);
    }
  } else {
    console.error("Token or secret key not provided");
  }
  res.json({ registeredUser });
};

export default { Post };
