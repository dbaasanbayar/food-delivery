import { DishType } from "@/lib/type";
import { AddDishes } from "./add_dishes";
import { FoodCard } from "./food-card";

export const Dishes = ({ getFoods }: { getFoods: DishType[] }) => {
  return (
    <div className="flex gap-10 items-center">
      {getFoods.map((food) => (
        <FoodCard key={food._id} food={food} />
      ))}
      <AddDishes />
    </div>
  );
};
