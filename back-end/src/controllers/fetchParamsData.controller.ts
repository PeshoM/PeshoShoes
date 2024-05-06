import { Request, Response } from "express";
import { Product } from "../schemas/products.schema";

const Get = async (req: Request, res: Response) => {
    const searchResults = req.query.searchResults;
    const doc = await Product.find({
      title: {
        $regex: `^${searchResults}`,
        $options: "i",
      },
    });
    let min: number = Number.MAX_VALUE,
      max: number = 0;
    for (let i = 0; i < doc.length; i++) {
      for (let j = 0; j < doc[i].colorVariations.length; j++) {
        if (doc[i].colorVariations[j].price <= min)
          min = doc[i].colorVariations[j].price;
        if (doc[i].colorVariations[j].price >= max)
          max = doc[i].colorVariations[j].price;
      }
    }
    res.json({ products: doc, minVal: min, maxVal: max });
}

export default { Get };