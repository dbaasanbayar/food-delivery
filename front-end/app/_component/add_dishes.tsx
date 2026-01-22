"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageInputIcon } from "@/app/_assets/input_image_icon";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { baseUrl, CategoryType, CreateDishType } from "@/lib/type";

export const AddDishes = () => {
  const [newFood, setNewFood] = useState<CreateDishType>({
    name: "",
    price: 0,
    ingredients: "",
    image: "",
    // categoryId: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const AddFood = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newFood.name);
      formData.append("price", newFood.price.toString());
      formData.append("ingredients", newFood.ingredients);
      // formData.append("categoryId", String(newFood.categoryId));

      if (file) formData.append("image", file);

      await fetch(`${baseUrl}/food`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });
      setNewFood({
        name: "",
        price: 0,
        ingredients: "",
        image: "",
        categoryId: "",
      });
      console.log("hool ireh", file);
      setFile(null);
      console.log("Food added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full w-10 h-10 text-white bg-[#EF4444] hover:bg-gray-200"
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Dish add</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new dish to your menu.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="name">Food name</Label>
              <Input
                onChange={(e) =>
                  setNewFood((prev) => ({ ...prev, name: e.target.value }))
                }
                id="name"
                placeholder="Type food name"
              />
            </div>
            <div className="w-[120px] space-y-2">
              <Label htmlFor="price">Food price</Label>
              <Input
                onChange={(e) =>
                  setNewFood((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                id="price"
                placeholder="Price"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Input
              onChange={(e) =>
                setNewFood((prev) => ({ ...prev, ingredients: e.target.value }))
              }
              id="ingredients"
              placeholder="List ingredients"
              className="h-[74px]"
            />
          </div>
          {/* <div className="space-y-2">
            <Label>Category</Label>
            <select
              className="w-full border rounded-md p-2"
              value={newFood.categoryId}
              onChange={(e) =>
                setNewFood((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="space-y-2">
            <Label>Food image</Label>
            <div
              className="w-full bg-gray-50 border-2 border-dashed border-gray-200 h-[138px] flex justify-center rounded-xl items-center cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-orange-400 text-3xl">
                  <ImageInputIcon />
                </span>
                <span className="text-sm text-gray-500 text-center px-4">
                  {file ? file.name : "Choose a file or drag & drop it here"}
                </span>
              </div>
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={AddFood} className="w-full sm:w-auto">
            Add Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
