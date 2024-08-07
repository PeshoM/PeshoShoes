import { Request, Response } from "express";
import { Product } from "../schemas/products.schema";
import { matchField, matchPrices, matchSearch } from "../utils/filter.utils";

type FilterFunction = (...args: any[]) => any;

const Get = async (req: Request, res: Response) => {
  if (Object.keys(req.query).length == 0) {
    console.log("query length is 0");
    const doc = await Product.find({});
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
    return res.json({ products: doc, minVal: min, maxVal: max });
  }
  //@ts-ignore
  let filterMap: Map<string, FilterFunction> = new Map([
    ["season", matchField],
    ["color", matchField],
    ["maxPrice", matchPrices],
    ["category", matchField],
    ["searchInput", matchSearch],
    ["categoryTag", matchField],
    ["categoryItem", matchField],
  ]);
  let map: Map<string, string> = new Map([
    ["CATEGORY", "category"],
    ["SEASON", "season"],
    ["SPORT", "sport"],
    ["POPULAR MODELS", "title"],
    ["FAVOURITE BRANDS", "brand"],
    ["\u200e", "brand"],
  ]);
  const params = req.query;
  console.log("req.query", req.query);
  console.log("req.query.categoryTag and item", req.query.categoryTag);
  console.log("++==========");

  let pipeline: any[] = [];
  let hashSet: Set<string> = new Set();

  Object.keys(params).forEach((key) => {
    hashSet.add(key);
    if (key == "minPrice") return;
    console.log("here", key, typeof params);
    pipeline = filterMap.get(key)?.(pipeline, params);
  });

  console.log(hashSet);
  console.log(JSON.stringify(pipeline));

  const products = await Product.aggregate(pipeline).exec();
  
  console.log("products after aggregate", products);
  if (hashSet.has("minPrice") || hashSet.has("maxPrice"))
    return res.json({ products });

  let min: number = Number.MAX_VALUE,
    max: number = 0;
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products[i].colorVariations.length; j++) {
      if (products[i].colorVariations[j].price <= min)
        min = products[i].colorVariations[j].price;
      if (products[i].colorVariations[j].price >= max)
        max = products[i].colorVariations[j].price;
    }
  }
  return res.json({ products, minVal: min, maxVal: max });

  //   console.log(paramsArray);
  //   // works now you need to filter everything
  //   let searchTag: string = map.get(params.categoryTag as string)!;
  //   console.log("search tag", searchTag);
  //   const query: any = {};
  //   query[searchTag] = {
  //     $regex: `^${params.categoryItem}`,
  //     $options: "i",
  //   };
  //   console.log("query", query);
  //   const doc = await Product.find(query);
  //   console.log(
  //     doc.length,
  //     "documents have been found with tag:",
  //     searchTag,
  //     "and name:",
  //     params.categoryItem
  //   );
  //   console.log(doc);
  //   let min: number = Number.MAX_VALUE,
  //     max: number = 0;
  //   for (let i = 0; i < doc.length; i++) {
  //     for (let j = 0; j < doc[i].colorVariations.length; j++) {
  //       if (doc[i].colorVariations[j].price <= min)
  //         min = doc[i].colorVariations[j].price;
  //       if (doc[i].colorVariations[j].price >= max)
  //         max = doc[i].colorVariations[j].price;
  //     }
  //   }
  //   res.json({ products: doc, minVal: min, maxVal: max });
};

export default { Get };
