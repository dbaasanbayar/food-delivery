import { DishType } from "@/lib/type";
import { AddDishes } from "./add_dishes";
import { FoodCard } from "./food-card";

export const Dishes = ({ getFoods }: { getFoods: DishType[] }) => {
  return (
    <div className="space-y-6">
      <div
        className="
          grid gap-4 
          grid-cols-1          // mobile
          xs:grid-cols-2       // ≥480px
          sm:grid-cols-2 
          md:grid-cols-3       // ≥768px
          lg:grid-cols-4       // ≥1024px
          xl:grid-cols-5       // very wide screens
          justify
        "
      >
        <div className="flex justify-center items-center border-2 border-red-400 rounded-2xl border-dashed">
          <AddDishes />
        </div>
        {getFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};
