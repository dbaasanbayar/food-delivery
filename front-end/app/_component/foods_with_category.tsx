"use client";

import { baseUrl, CategoryType, DishType } from "@/lib/type";
import { useEffect, useState } from "react";
import { ClientFoodCard } from "./client-food-card";

export function FoodWithCategory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/categories-with-foods`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="p-6 space-y-8">
      {categories.map((category) => (
        <div key={category._id}>
          <h2 className="text-xl font-bold mb-3">{category.name}</h2>
          <div className="grid grid-cols-3 gap-4">
            {category.foods.map((food) => (
              <ClientFoodCard key={food._id} food={food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
