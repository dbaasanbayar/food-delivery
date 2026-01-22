import { CategoryType } from "@/lib/type";
import { createContext } from "react";

export const FoodContext = createContext<CategoryType[]>([]);
