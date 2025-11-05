import { DishType } from "@/lib/type";

const foodlist: DishType[] = [
  { name: "huushuur", number: 12 },
  { name: "huushuur", number: 12 },
  { name: "huushuur", number: 12 },
  { name: "huushuur", number: 12 },
];

export const DishButton = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      {foodlist.map((food) => {
        return <CategoryButton food={food} />;
      })}
    </div>
  );
};

function CategoryButton({ food }: { food: DishType }) {
  const { name, number } = food;
  return (
    <div className="border flex gap-2 rounded-full px-4 py-2 bg-white">
      {name}
      <span className="bg-black text-white rounded-full px-2.5">{number}</span>
    </div>
  );
}
