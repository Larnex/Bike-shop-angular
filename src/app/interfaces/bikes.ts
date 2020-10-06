export interface Bike {
  id: number;
  imgUrl: string;
  price: number;
  discount: number;
  key?: string;
  main: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string;
  discountUntil: string;
  new: boolean;
  color: string[];
  size: string[];
  review: Review[];
}

export interface Review {
  author: string;
  text: string;
  rating: number;
}
