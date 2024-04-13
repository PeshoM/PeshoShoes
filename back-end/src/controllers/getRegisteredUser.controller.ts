import { User, user } from "../schemas/users.schema";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
//process.env.SECRET_KEY
//process.env.HASH_ALGORITHM
const Post = async (req: Request, res: Response) => {
    let decoded: user | null = null;
  let doc: user | null = null;
  let arr = [];
  console.log('local here');
  if(req.body.token) console.log('here'); else console.log('there');
};

export default { Post };