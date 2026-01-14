export type CategoryType = {
  name: string;
  number: number;
  _id: string;
};

export type DishType = {
  name: string;
  price: number;
  id: number;
  ingredients: string;
  image: string;
};

export type ClientType = {
  text: string;
  type: string;
};

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
