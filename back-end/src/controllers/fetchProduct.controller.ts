import { Product, product } from "../schemas/products.schema";
import { Request, Response } from "express";

const Get = async (req: Request, res: Response) => {
  const { title, color } = req.query;
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
  let updatedProd: product = product!;
  updatedProd.colorVariations = newArr;
  res.json({
    product: updatedProd,
  });
};

export default { Get };
