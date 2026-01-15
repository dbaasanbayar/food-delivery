"use client";
import { DishCategory } from "@/app/_component/dish_category";
import { Dishes } from "@/app/_component/dishes";
import { FoodContext } from "@/app/contexts/food_context";
import { baseUrl, CategoryType, DishType } from "@/lib/type";
import { useEffect, useState } from "react";
const Food = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [getFoods, setGetFoods] = useState<DishType[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/category`);
        const data = await response.json();
        console.log("Category data", data);
        setCategories(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    fetchCategories();
  }, [baseUrl]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${baseUrl}/food`);
        const data = await response.json();
        console.log("Get food data:", data);
        setGetFoods(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    fetchFoods();
  }, []);
  return (
    <FoodContext.Provider value={categories}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col p-6 h-full w-full bg-white">
          <h1 className="pb-4 text-[#09090B] font-inter text-xl font-semibold">
            Dishes category
          </h1>
          <div className="flex gap-2 flex-wrap">
            <DishCategory />
          </div>
        </div>
        <div className="bg-white p-6">
          <Dishes getFoods={getFoods} />
        </div>
      </div>
    </FoodContext.Provider>
  );
};
export default Food;
