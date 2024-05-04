import { Product, ColorVariation, product } from "../schemas/products.schema";
import { Request, Response } from "express";

const Post = async (req: Request, res: Response) => {
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
  for (let i = 0; i < (req?.files as Express.Multer.File[]).length; i++) {
    //@ts-ignore
    const fieldName = req.files[i].fieldname;
    if (fieldName.startsWith("images_")) {
      const indices = fieldName.slice(7).split("_");
      const rowIndex = parseInt(indices[0]);
      const colIndex = parseInt(indices[1]);

      if (!imagesArr[rowIndex]) {
        imagesArr[rowIndex] = [];
      }
      //@ts-ignore
      const filename = req.files[i].filename;

      imagesArr[rowIndex][colIndex] = filename;
    }
  }
  let variations: number = imagesArr.length;
  for (let i = 0; i < variations; i++) {
    colorVariations[i] = {
      images: [],
      price: 0,
      quantity: [],
      sizes: [],
      color: "",
    };
    colorVariations[i]["images"] = imagesArr[i];
    colorVariations[i]["price"] =
      typeof req.body.price === "string" ? req.body.price : req.body.price[i];
    colorVariations[i]["quantity"] = quantityArr[i];
    colorVariations[i]["sizes"] = sizesArr[i];
    colorVariations[i]["color"] =
      typeof req.body.color === "string" ? req.body.color : req.body.color[i];
  }

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    colorVariations,
    season: req.body.season,
    gender: req.body.gender,
    category: req.body.category,
    sport: req.body.sport,
  });

  await product.save();

  res.json({ message: "success" });
};

const Get = async (req: Request, res: Response) => {
  const doc = await Product.find({});
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

const Update = async (req: Request, res: Response) => {
  let colorVariations: ColorVariation[] = [];
  const sizesArr: number[][] = [];
  const quantityArr: number[][] = [];
  let imagesArr: string[][] = [];
  const productToChange = await Product.findOne({ _id: req.body.productId });
  const indexSetString = req.body.changedIdx;
  const changedIdx = new Set(JSON.parse(indexSetString));

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
  for (let i = 0; i < (req?.files as Express.Multer.File[]).length; i++) {
    //@ts-ignore
    const fieldName = req.files[i].fieldname;
    // console.log("log ifeldname", fieldName);
    if (fieldName.startsWith("images_")) {
      const indices = fieldName.slice(7).split("_");
      const rowIndex = parseInt(indices[0]);
      const colIndex = parseInt(indices[1]);

      if (!imagesArr[rowIndex]) {
        imagesArr[rowIndex] = [];
      }
      //@ts-ignore
      const filename = req.files[i].filename;
      // console.log("filenames", filename);
      imagesArr[rowIndex][colIndex] = filename;
    }
  }
  let variations: number = imagesArr.length;
  for (let i: number = 0; i < variations; i++) {
    colorVariations[i] = {
      images: [],
      price: 0,
      quantity: [],
      sizes: [],
      color: "",
    };

    colorVariations[i]["images"] = changedIdx.has(i)
      ? imagesArr[i]
      : productToChange!.colorVariations[i].images;
    colorVariations[i]["price"] =
      typeof req.body.price === "string" ? req.body.price : req.body.price[i];
    colorVariations[i]["quantity"] = quantityArr[i];
    colorVariations[i]["sizes"] = sizesArr[i];
    colorVariations[i]["color"] =
      typeof req.body.color === "string" ? req.body.color : req.body.color[i];
  }
  console.log(colorVariations);
  const updatedProd = {
    title: req.body.title,
    description: req.body.description,
    colorVariations,
    season: req.body.season,
    _id: req.body.productId,
  } as product;

  const filter = { _id: req.body.productId };
  const update = updatedProd;
  // console.log("asd", productToChange, updatedProd);
  const updatedProduct = await Product.findOneAndUpdate(filter, update, {
    new: true,
  });

  await updatedProduct?.save();

  if (updatedProduct) {
    console.log(updatedProduct);
    res.json({ message: "success" });
  } else {
    console.log("Failed to update the product");
    res.json({ message: "Product not found or not updated" });
  }
};

export default { Post, Get, Update };
