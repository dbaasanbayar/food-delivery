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
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
      {categories.map((category) => (
        <div key={category._id}>
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {category.categoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {category.foods.map((food) => (
              <ClientFoodCard key={food._id} food={food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
