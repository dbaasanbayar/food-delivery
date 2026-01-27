export type CategoryType = {
  name: string;
  number: number;
  _id: string;
  foods: DishType[];
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
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
};

export type StepProps = {
  formData: ClientType;
  setFormData: React.Dispatch<React.SetStateAction<ClientType>>;
};

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
