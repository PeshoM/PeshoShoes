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

type params = "sizes" | "color";

const Post = async (req: Request, res: Response) => {
  let products: Product[] = req.body.products,
    min: number = req.body.minPrice,
    max: number = req.body.maxPrice,
    arr: Product[] = [],
    sizesSet = new Set(req.body.pickedSizes),
    colorsSet = new Set(req.body.pickedColor),
    seasonsSet = new Set(req.body.pickedSeason);

  console.log(products.length, "asd");
  const filterArray = (set: Set<any>, arr: Product[], param: params) => {
    let filteredArr: Product[] = [];
    let hashSet = new Set();
    if (set.size == 0) return arr;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].colorVariations[0][param].length; j++) {
        if (
          set.has(arr[i].colorVariations[0][param][j]) &&
          !hashSet.has(arr[i])
        ) {
          filteredArr.push(arr[i]);
          hashSet.add(arr[i]);
        }
      }
    }
    return filteredArr;
  };

  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products[i].colorVariations.length; j++) {
      if (
        products[i].colorVariations[j].price <= max &&
        products[i].colorVariations[j].price >= min &&
        (seasonsSet.has(products[i].season) || seasonsSet.size == 0) &&
        (colorsSet.has(products[i].colorVariations[j].color) ||
          colorsSet.size == 0)
      ) {
        let colorVar: ColorVariation = {
          images: [],
          price: 0,
          quantity: [],
          sizes: [],
          color: "",
        };
        colorVar["images"] = products[i].colorVariations[j].images;
        colorVar["price"] = products[i].colorVariations[j].price;
        colorVar["quantity"] = products[i].colorVariations[j].quantity;
        colorVar["sizes"] = products[i].colorVariations[j].sizes;
        colorVar["color"] = products[i].colorVariations[j].color;
        arr.push({
          title: products[i].title,
          description: products[i].description,
          colorVariations: [colorVar],
          season: products[i].season,
        });
      } else continue;
    }
  }

  arr = filterArray(sizesSet, arr, "sizes");

  res.json({ filteredData: arr });
};

export default { Post }