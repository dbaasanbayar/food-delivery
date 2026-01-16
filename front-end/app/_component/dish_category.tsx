import { AddCategories } from "./add_catergories";
import { useContext } from "react";
import { FoodContext } from "../contexts/food_context";
import { Button } from "@/components/ui/button";

type Props = {
  onSelectedCategory: (id: string | null) => void;
};

export const DishCategory = ({ onSelectedCategory }: Props) => {
  const categories = useContext(FoodContext);
  return (
    <div className="flex gap-3 flex-wrap">
      <Button
        onClick={() => onSelectedCategory(null)}
        className="bg-white text-black border hover:text-white"
      >
        All Dishes
      </Button>

      {categories.map((category) => (
        <Button
          onClick={() => onSelectedCategory(category._id)}
          className="bg-white text-black border hover:text-white"
          key={category._id}
        >
          {category.name}
        </Button>
      ))}
      <div>
        <AddCategories />
      </div>
    </div>
  );
};
