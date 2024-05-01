export interface ColorVariation {
  images: string[];
  price: number;
  quantity: number[];
  sizes: number[];
  color: string;
  rating?: number[];
}
export interface Prod {
  _id: string
  title: string;
  description: string;
  colorVariations: ColorVariation[];
  season: string;
}
