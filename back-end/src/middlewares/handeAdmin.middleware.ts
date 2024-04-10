import { NextFunction, Request, Response } from 'express';
const jwt = require("jsonwebtoken");
const users = require("../schemas/users.schema");
import env from "dotenv";
env.config();

interface adminValidation extends Request {
  role: string;
}
const handleAdminReq = async (req: adminValidation, res: Response, next: NextFunction) => {
  let decoded = null;
  let doc = null;
  let arr = [];
  if (req.body.key) {
    console.log('here', req.body.key);
    decoded = await jwt.verify(req.body.key, process.env.SECRET_KEY, {
      algorithms: [process.env.HASH_ALGORITHM]
    });
    console.log(decoded.key, "name");
    doc = await users.findOne({ username: decoded.key.username });
    console.log(doc);
  } else return res.json({ role: "user" });

  req.role = doc.role;
  next();
};

module.exports = {
  handleAdminReq,
};
