import { Schema, model, Document } from "mongoose";

export interface ColorVariation {
  images: string[];
  price: number;
  quantity: number[];
  sizes: number[];
  color: string;
  rating?: number[];
}

export interface product extends Document {
  title: string;
  description: string;
  brand: string;
  colorVariations: ColorVariation[];
  season: string;
  gender: string;
  category: string;
  sport?: string;
  _id?: string;
}

const productSchema = new Schema<product>({
  title: String,
  description: String,
  brand: String,
  colorVariations: [
    new Schema<ColorVariation>({
      images: [String],
      price: Number,
      quantity: [Number],
      sizes: [Number],
      color: String,
      rating: [Number],
    }),
  ],
  season: String,
  gender: String,
  category: String,
  sport: String
});

export const Product = model<product>("Product", productSchema);
