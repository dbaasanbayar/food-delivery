"use client";
import { DishCategory } from "@/app/_component/dish_category";
import { Dishes } from "@/app/_component/dishes";
import { FoodContext } from "@/app/contexts/food_context";
import { baseUrl, CategoryType, DishType } from "@/lib/type";
import { useEffect, useState } from "react";
const Food = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [getFoods, setGetFoods] = useState<DishType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${baseUrl}/food`);
        const data = await response.json();
        console.log("data awah", data);
        setGetFoods(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = selectedCategory
    ? getFoods.filter((food) => food.categoryId === selectedCategory)
    : getFoods;

  return (
    <FoodContext.Provider value={categories}>
      <div className="min-h-screen flex flex-col gap-5 bg-gray-100 pb-12">
        <div className="bg-white px-4 py-6 md:px-6 lg:px-8">
          <h1 className="mb-5 text-xl font-semibold text-gray-900 md:text-2xl">
            Dishes category
          </h1>
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            <DishCategory onSelectedCategory={setSelectedCategory} />
          </div>
        </div>
        <div className="px-4 py-6 md:px-6 bg-white lg:px-8">
          <Dishes getFoods={filteredFoods} />
        </div>
      </div>
    </FoodContext.Provider>
  );
};
export default Food;
