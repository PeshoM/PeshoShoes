import {Request, Response} from "express";
interface adminValidation extends Request {
  role: string;
}
const Post = async (req: adminValidation, res: Response) => {
  let role = req.role;
  console.log('req.role = ', req.role);
  let tokenData: {role: string} = { role };
  console.log(tokenData);
  res.json(tokenData);
};

module.exports = { 
    Post
};