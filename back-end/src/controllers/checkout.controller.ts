import { Request, Response } from "express";
import {
  ColorVariation,
  Product,
  cartItem,
  product,
} from "../schemas/products.schema";

const updateProductQuantities = async (
  products: product[],
  cartItems: cartItem[]
) => {
  for (let i = 0; i < cartItems.length; i++) {
    const product = await Product.findOne({ title: cartItems[i].title });
    if (!product) {
      console.log(`Product with title ${cartItems[i].title} not found.`);
      continue; // Move to the next cart item if product not found
    }

    console.log(product.colorVariations);
    for (let j = 0; j < product.colorVariations.length; j++) {
      const colorVariation: ColorVariation = product.colorVariations[j];
      if (colorVariation.color === cartItems[i].color) {
        const index = colorVariation.sizes.indexOf(cartItems[i].size);
        if (index !== -1) {
          colorVariation.quantity[index] -= cartItems[i].quantity;
          if (colorVariation.quantity[index] == 0) {
            colorVariation.quantity.splice(index, 1);
            colorVariation.sizes.splice(index, 1);
          }
          console.log("index is", index);
          console.log(
            cartItems[i].title,
            cartItems[i].size,
            cartItems[i].quantity,
            colorVariation.quantity[index]
          );
        } else {
          console.log(`Size ${cartItems[i].size} not found.`);
        }
      }
    }

    // Update the product in the database
    try {
      await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: { colorVariations: product.colorVariations } }
      );
      console.log(`Product ${product.title} updated successfully.`);
    } catch (error) {
      console.error(`Error updating product ${product.title}:`, error);
    }
  }
};

const Post = async (req: Request, res: Response) => {
  const cartItems: cartItem[] = req.body.cartItems;
  const products = await Product.find({});
  console.log(cartItems);

  await updateProductQuantities(products, cartItems);
  res.json({ cartItems: [] });
};

export default { Post };
