import { AddDishes } from "@/app/_component/add_dishes";
import { DishCategory } from "@/app/_component/dish_category";
const Food = () => {
  return (
    <div>
      <div className="flex flex-col p-6 h-[174px]">
        <h1 className="pb-4 text-[#09090B] font-inter text-xl font-semibold">
          Dishes category
        </h1>
        <div className="flex gap-2 flex-wrap">
          <DishCategory />
        </div>
      </div>
      <div className="p-4 border">
        <h1>Appetizers</h1>
        <div className="h-[239px] w-[225px] flex items-center justify-center flex-col border border-red-300 border-dashed">
          <AddDishes />
          <h1>Add new Dish to Appetizers</h1>
        </div>
      </div>
    </div>
  );
};
export default Food;
