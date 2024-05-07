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
  brand: string;
  description: string;
  colorVariations: ColorVariation[];
  season: string;
  gender: string;
  category: string;
  sport: string;
}
export interface CartItem {
  _id: string;
  title: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  size: number;
  quantity: number;
  color: string;
  season: string;
  gender: string;
  category: string;
  sport: string;
}