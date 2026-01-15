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
import { CategoryType } from "@/lib/type";
import { useContext } from "react";
import { FoodContext } from "../contexts/food_context";

export const FoodEditButton = () => {
  const categories = useContext(FoodContext);
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Dish category</Label>
            <Select>
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
            <Button variant="outline" className="border-red-200">
              <IconDelete />
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
