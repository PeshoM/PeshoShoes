import { Request, Response } from "express";

interface adminValidation extends Request {
  role?: string;
}

const Post = async (req: adminValidation, res: Response) => {
  let role: string = req.role!;
  console.log("req.role = ", req.role);
  let tokenData: { role: string } = { role };
  res.json(tokenData);
};

export default { Post };