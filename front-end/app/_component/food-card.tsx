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
import { DishType } from "@/lib/type";

export const FoodCard = ({ food }: { food: DishType }) => {
  const { name, price, ingredients } = food;

  return (
    <Card
      className="w-full
    "
    >
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="relative group w-full h-30 overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover"
              src="/images/food.png"
              alt="Delicious food"
            />
            <div className="absolute bottom-2 bg-white overflow-hidden rounded-full right-2">
              <FoodEditButton />
            </div>
          </div>
          <div className="flex justify-between">
            <span>{name}</span>
            <span>{price}$</span>
          </div>
          <span>{ingredients}</span>
        </div>
      </CardContent>
    </Card>
  );
};
