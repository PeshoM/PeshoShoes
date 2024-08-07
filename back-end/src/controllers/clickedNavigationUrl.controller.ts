import { Request, Response } from "express";
import { Product, product } from "../schemas/products.schema";

const Get = async (req: Request, res: Response) => {
    console.log('here');
  const title = req.query.title;
  const name = req.query.name;
  let map: Map<string, string> = new Map([
    ["CATEGORY", "category"],
    ["SEASON", "season"],
    ["SPORT", "sport"],
    ["POPULAR MODELS", "title"],
    ["FAVOURITE BRANDS", "brand"],
    ["\u200e", "brand"],
  ]);
  let searchTag: string = map.get(title as string)!;
  console.log("search tag", searchTag);
  const query: any = {};
  query[searchTag] = {
    $regex: `^${name}`,
    $options: "i",
  };
  const doc = await Product.find(query);
  console.log(doc.length, "documents have been found with tag:",searchTag,"and name:", name);
  let prods: product[] = [],
    min: number = Number.MAX_VALUE,
    max: number = 0;
  for (let i = 0; i < doc.length; i++) {
    for (let j = 0; j < doc[i].colorVariations.length; j++) {
      if (doc[i].colorVariations[j].price <= min)
        min = doc[i].colorVariations[j].price;
      if (doc[i].colorVariations[j].price >= max)
        max = doc[i].colorVariations[j].price;
    }
    prods.push({
      title: doc[i].title,
      description: doc[i].description,
      colorVariations: doc[i].colorVariations,
      season: doc[i].season,
    } as product);
  }
  res.json({ products: doc, minVal: min, maxVal: max });
};

export default { Get };
