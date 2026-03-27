import { baseUrl } from "./type";

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  email: string;
  password: string;
  phoneNumber: number;
  address: string;
};

export const signInApi = async ({ email, password }: SignInParams) => {
  const response = await fetch(`${baseUrl}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const signUpApi = async ({ email, password, phoneNumber, address }: SignUpParams) => {
  const response = await fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, phoneNumber, address }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
