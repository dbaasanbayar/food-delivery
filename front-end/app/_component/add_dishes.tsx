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

export const AddDishes = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full w-10 h-10 text-white bg-[#EF4444] hover:bg-[#dc2626]"
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
              <Input id="name" placeholder="Type food name" />
            </div>
            <div className="w-[120px] space-y-2">
              <Label htmlFor="price">Food price</Label>
              <Input id="price" placeholder="Price" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Input
              id="ingredients"
              placeholder="List ingredients"
              className="h-[74px]"
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
          <Button type="submit" className="w-full sm:w-auto">
            Add Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
