"use client";
import { baseUrl, DishType } from "@/lib/type";
import { CategoryType } from "@/lib/type";

import { useEffect, useState } from "react";
import { AddCategories } from "./add_catergories";

const foods: DishType[] = [
  { name: "buuz", price: 10, id: 1, ingredients: "meat, flour", image: "" },
];

export const DishCategory = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

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

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((category) => {
        return <Category category={category} key={category._id} />;
      })}
      <div>
        <AddCategories />
      </div>
    </div>
  );
};

export function Category({ category }: { category: CategoryType }) {
  const { name } = category;

  return (
    <div className="border flex gap-2 rounded-full px-4 py-2 bg-white">
      {name}
    </div>
  );
}
