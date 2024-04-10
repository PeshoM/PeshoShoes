import {Request, Response} from "express";
interface adminValidation extends Request {
  role: string;
}
const Post = async (req: adminValidation, res: Response) => {
  let role = req.role;
  let tokenData: {role: string} = { role };
  res.json(tokenData);
};

module.exports = { 
    Post
};