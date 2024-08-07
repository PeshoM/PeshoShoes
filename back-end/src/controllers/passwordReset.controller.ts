import { Request, Response } from "express";
import { User, user } from "../schemas/users.schema";
const jwt = require("jsonwebtoken");

interface JwtPayload {
  key: { firstName: string };
  iat: number;
  exp?: number;
}

const Post = async (req: Request, res: Response) => {
    let key = req.body.token;
    let newPassword: string = req.body.newPassword;
    const secretKey: string = process.env.SECRET_KEY || "";

    try {
      const decoded: any = jwt.verify(key, secretKey);

      const filter = { firstName: decoded.key.firstName };
      const update = { password: newPassword }; 

      const userToChange = await User.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (!userToChange) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Server error" });
    }
}

const Get = async (req: Request, res: Response) => {
    const key = req.query.token;
    // console.log("received token", key);
    const secretKey: string = process.env.SECRET_KEY || "";

    try {
      const decoded = jwt.verify(key, secretKey) as JwtPayload;
      console.log("Decoded JWT:", decoded);

      return res.json({ message: "success" });
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return res.json({ message: "Invalid token" });
    }
}

export default { Post, Get };