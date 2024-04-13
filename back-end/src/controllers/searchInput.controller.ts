const products = require("../schemas/products.schema");
import { Request, Response } from "express";

interface ColorVariation {
  images: string[];
  price: number;
  quantity: number[];
  sizes: number[];
  color: string;
  rating?: number[];
}

interface Product {
  title: string;
  description: string;
  colorVariations: ColorVariation[];
  season: string;
}

const Post = async (req: Request, res: Response) => {
  let data: string = req.body.input;
  let results: Product[] | undefined;
  if(data == "") return res.json(results = await products.find({}));
  if (data) {
    let results = await products.find({
      title: {
        $regex: `^${data}`,
        $options: "i",
      },
    });
    res.json(results);
  }
};

export default { Post };