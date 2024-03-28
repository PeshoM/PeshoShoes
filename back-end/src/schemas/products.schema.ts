import { Schema, model, Document } from "mongoose";

// interface Quantity {
//   available: number;
//   reserved: number;
//   sold: number;
// }

interface ColorVariation {
  images: string[];
  price: number;
  quantity: number[];
  sizes: number[];
  color: string;
  rating: number[];
}

export interface Product extends Document {
  title: string;
  description: string;
  colorVariations: ColorVariation[];
  season: string;
}

const productSchema = new Schema<Product>({
  title: String,
  description: String,
  colorVariations: [
    new Schema<ColorVariation>({
      images: [String],
      price: Number,
      quantity: [Number],
      sizes: [Number],
      color: String,
      rating: [Number]
    }),
  ],
  season: String,
});
//need categories soon
module.exports = model<Product>("products", productSchema);
