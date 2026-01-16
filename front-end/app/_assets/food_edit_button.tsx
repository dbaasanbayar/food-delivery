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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconMarker } from "./icon_marker";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconDelete } from "./icon_delete";
import { ImageInputIcon } from "./input_image_icon";
import { Input } from "@/components/ui/input";
import { baseUrl, DishType } from "@/lib/type";
import { useContext, useEffect, useState } from "react";
import { FoodContext } from "../contexts/food_context";

export const FoodEditButton = ({ food }: { food: DishType }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [form, setForm] = useState({
    name: food.name,
    price: food.price,
    ingredients: food.ingredients,
  });

  useEffect(() => {
    setForm({
      name: food.name,
      price: food.price,
      ingredients: food.ingredients,
    });
  }, [food]);

  const categories = useContext(FoodContext);

  const deleteFood = async (_id: string) => {
    try {
      const res = await fetch(`${baseUrl}/food/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateFood = async () => {
    try {
      const res = await fetch(`${baseUrl}/food/${food._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }
      console.log("Update successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-white rounded-full shadow-md hover:bg-gray-300 transition-colors">
        <IconMarker />
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Dish edit</DialogTitle>
          <DialogDescription>
            Make changes to your dish details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Type food name"
              className="col-span-3 w-full min-w-0"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Dish category</Label>
            <Select
              // value={form.categoryId}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, categoryId: value }))
              }
            >
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredients" className="text-right">
              Ingredients
            </Label>
            <Input
              id="ingredients"
              placeholder="List ingredients"
              className="col-span-3"
              value={form.ingredients}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, ingredients: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="col-span-3"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: Number(e.target.value) }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Food image</Label>
            <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 h-[138px] flex justify-center rounded-xl items-center cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center gap-2">
                <span className="text-orange-400 text-3xl">
                  <ImageInputIcon />
                </span>
                <span className="text-sm text-gray-500 text-center px-4">
                  Choose a file or drag & drop it here
                </span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="border-red-200"
              onClick={() => setOpenDelete(true)}
            >
              <IconDelete />
            </Button>
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete this dish?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpenDelete(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteFood(food._id);
                      setOpenDelete(false);
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={updateFood} type="submit">
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
