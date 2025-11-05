import { DishButton } from "@/app/_component/dish_button";
const Food = () => {
  return (
    <div className="flex flex-col p-6 h-[174px] bg-blue-400">
      <h1 className="pb-4 text-[#09090B] font-inter text-xl font-semibold">
        Dishes category
      </h1>
      <div className="flex gap-2 flex-wrap">
        <DishButton />
      </div>
    </div>
  );
};
export default Food;
