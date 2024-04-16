import { User, user } from "../schemas/users.schema";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

const Post = async (req: Request, res: Response) => {
  const { key } = req.body;
  const secretKey = process.env.SECRET_KEY || "";

  console.log("Start of request");

  if (!key || key == "" || !secretKey) {
    console.error("Token or secret key not provided");
    return res.status(400).json({ error: "Token or secret key not provided" });
  }

  try {
    const decoded = jwt.verify(key, secretKey) as { key: { email: string }; iat: number };
    console.log("Decoded JWT:", decoded);

    const registeredUser = await User.findOne({ email: decoded.key.email });
    console.log("Registered user:", registeredUser);

    if (!registeredUser) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ registeredUser });
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return res.status(401).json({ error: "Invalid token" });
  }};

export default { Post };