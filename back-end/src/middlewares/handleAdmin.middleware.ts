import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import { User, user } from "../schemas/users.schema";
import env from "dotenv";
env.config();

interface adminValidation extends Request {
  role?: string;
}
const handleAdminReq = async (
  req: adminValidation,
  res: Response,
  next: NextFunction
) => {
  let decoded = null;
  let doc: user | null = null;
  let arr = [];
  if (req.body.key) {
    decoded = await jwt.verify(req.body.key, process.env.SECRET_KEY, {
      algorithms: [process.env.HASH_ALGORITHM],
    });
    doc = await User.findOne({ email: decoded.key.email });
  } else return res.json({ role: "user" });

  req.role = doc!.role;
  next();
};

export default handleAdminReq;
