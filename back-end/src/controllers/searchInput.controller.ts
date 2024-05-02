import { Product, product } from "../schemas/products.schema"
import { Request, Response } from "express";

const Post = async (req: Request, res: Response) => {
  let data: string = req.body.input;
  if(data == "" || !data) return;
  if (data) {
    let results: product[] = await Product.find({
      title: {
        $regex: `^${data}`,
        $options: "i",
      },
    });
    res.json(results);
  }
};

export default { Post };