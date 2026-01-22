import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FoodEditButton } from "../_assets/food_edit_button";
import { baseUrl, DishType } from "@/lib/type";

export const FoodCard = ({ food }: { food: DishType }) => {
  const { name, price, ingredients, image } = food;

  return (
    <Card
      className="w-full overflow-hidden hover:shadow-lg transition-shadow
    "
    >
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col gap-3">
          <div className="relative group w-full aspect-video overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={`${baseUrl}${image}`}
              alt={name}
            />
            <div className="absolute bottom-2 bg-white overflow-hidden rounded-full right-2">
              <FoodEditButton food={food} />
            </div>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-900 text-lg font-semibold leading-tight">
              {name}
            </span>
            <span className="text-green-600 font-bold">{price}$</span>
          </div>
          <span className="text-sm text-gray-500 line-clamp-2">
            {ingredients}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
