const products = require("../schemas/products.schema");
const path = require("path");
import { Response } from "express";
import type { Request } from "express";

interface ColorVariation {
  images: string[];
  price: number;
  quantity: number[];
  sizes: number[];
  color: string;
  rating?: number[];
}
interface RequestFiles extends Request {
  files: Express.Multer.File[];
}

const Post = async (req: RequestFiles, res: Response) => {
  let colorVariations: ColorVariation[] = [];
  const sizesArr: number[][] = [];
  const quantityArr: number[][] = [];
  let imagesArr: string[][] = [];

  for (const key in req.body) {
    if (key.startsWith("sizes_")) {
      const indices = key.slice(6).split("_");
      const rowIndex = parseInt(indices[0]);
      const colIndex = parseInt(indices[1]);

      if (!sizesArr[rowIndex]) {
        sizesArr[rowIndex] = [];
      }

      sizesArr[rowIndex][colIndex] = parseFloat(req.body[key]);
    }
    if (key.startsWith("quantity_")) {
      const indices = key.slice(9).split("_");
      const rowIndex = parseInt(indices[0]);

      if (!quantityArr[rowIndex]) {
        quantityArr[rowIndex] = [];
      }

      quantityArr[rowIndex].push(parseInt(req.body[key]));
    }
  }
  for (let i = 0; i < req.files.length; i++) {
    const fieldName = req.files[i].fieldname;

    if (fieldName.startsWith("images_")) {
      const indices = fieldName.slice(7).split("_");
      const rowIndex = parseInt(indices[0]);
      const colIndex = parseInt(indices[1]);

      if (!imagesArr[rowIndex]) {
        imagesArr[rowIndex] = [];
      }

      const filename = req.files[i].filename;

      imagesArr[rowIndex][colIndex] = filename;
    }
  }
  let variations = req.body.price.length;
  for (let i = 0; i < variations; i++) {
    colorVariations[i] = {images: [], price: 0, quantity: [], sizes: [], color: ""};
    colorVariations[i]["images"] = imagesArr[i];
    colorVariations[i]["price"] = req.body.price[i];
    colorVariations[i]["quantity"] = quantityArr[i];
    colorVariations[i]["sizes"] = sizesArr[i];
    colorVariations[i]["color"] = req.body.color[i];
  }

  const product = new products({
    title: req.body.title,
    description: req.body.description,
    colorVariations,
    season: req.body.season,
  });

  await product.save();

  res.json({ message: "success" });
};

const Get = async (req: Request, res: Response) => {
  const doc = await products.find({});
  let prods = [],
    min = 0,
    max = 0;
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
    });
  }
  res.json({ products: prods, minVal: min, maxVal: max });
};

module.exports = {
  Post,
  Get,
};
