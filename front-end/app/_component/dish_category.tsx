import { CategoryType } from "@/lib/type";
import { AddCategories } from "./add_catergories";
import { useContext } from "react";
import { FoodContext } from "../contexts/food_context";

export const DishCategory = () => {
  const categories = useContext(FoodContext);
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((category) => {
        return <Category category={category} key={category._id} />;
      })}
      <div>
        <AddCategories />
      </div>
    </div>
  );
};

export function Category({ category }: { category: CategoryType }) {
  const { name } = category;

  return <div className="border rounded-full px-4 p-2 bg-white">{name}</div>;
}
