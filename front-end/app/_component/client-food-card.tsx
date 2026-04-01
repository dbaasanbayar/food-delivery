"use client";
import { Card, CardContent } from "@/components/ui/card";
import { baseUrl, DishType } from "@/lib/type";
import { useCart } from "../contexts/CartContext";

export const ClientFoodCard = ({ food }: { food: DishType }) => {
  const { name, price, ingredients, image } = food;
  const { addToCart } = useCart(); 

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col gap-3">
          <div className="relative group w-full aspect-video overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={`${baseUrl}${image}`}
              alt={name}
            />
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

          {/* ✅ Нэмэх товч */}
          <button
            onClick={() => addToCart(food)}
            className="w-full h-10 bg-[#18181B] text-white rounded-md hover:bg-[#27272A] transition-colors"
          >
            + Сагсанд нэмэх
          </button>
        </div>
      </CardContent>
    </Card>
  );
};