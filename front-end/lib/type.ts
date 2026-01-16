export type CategoryType = {
  name: string;
  number: number;
  _id: string;
};

export type DishType = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  image?: string;
  categoryId?: string;
};

export type CreateDishType = {
  name: string;
  price: number;
  ingredients: string;
  image?: string;
  categoryId?: string;
};

export type ClientType = {
  text: string;
  type: string;
};

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
