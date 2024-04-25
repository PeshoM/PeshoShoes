import { Product, product } from "../schemas/products.schema";
import { Request, Response } from "express";

const Post = async (req: Request, res: Response) => {
  const { title, color } = req.body;
  let newArr = [],
    arrRest = [];
  const product: product | null = await Product.findOne({ title });
  for (let i: number = 0; i < product!.colorVariations.length; i++) {
    product!.colorVariations[i].color == color
      ? newArr.push(product!.colorVariations[i])
      : arrRest.push(product!.colorVariations[i]);
  }
  for (let i: number = 0; i < arrRest.length; i++) {
    newArr.push(arrRest[i]);
  }
  console.log("after", newArr);
  res.json({
    product: {
      title: product!.title,
      description: product!.description,
      colorVariations: newArr,
      season: product!.season,
      _id: product!._id
    },
  });
};

export default { Post };