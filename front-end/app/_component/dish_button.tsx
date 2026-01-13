import { DishType } from "@/lib/type";
import { CategoryType } from "@/lib/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageInputIcon } from "@/app/_assets/input_image_icon";

const foodcaterorylist: CategoryType[] = [
  { name: "huushuur", number: 12, id: 1 },
];
const foods: DishType[] = [
  { name: "buuz", price: 10, id: 1, ingredients: "meat, flour", image: "" },
];

export const Dish = () => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {foodcaterorylist.map((category) => {
        return <DishCategory category={category} key={category.id} />;
      })}
      <div>
        <AddCategories />
      </div>
    </div>
  );
};

function DishCategory({ category }: { category: CategoryType }) {
  const { name, number } = category;
  return (
    <div className="border flex gap-2 rounded-full px-4 py-2 bg-white">
      {name}
      <span className="bg-black text-white rounded-full px-2.5">{number}</span>
    </div>
  );
}

const AddCategories = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={`rounded-[50%] text-white bg-[#EF4444] cursor-pointer`}
        >
          +
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new category</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <h1>Category name</h1>
          <Input placeholder="Type category name" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Add category</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const AddDishes = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={`rounded-[50%] text-white bg-[#EF4444] cursor-pointer`}
        >
          +
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-[548px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Dish info</AlertDialogTitle>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 object-contain">
              <div>
                <h1>food name</h1>
                <Input placeholder="Type food name" />
              </div>
              <div>
                <h1>food price</h1>
                <Input placeholder="Enter price" />
              </div>
            </div>
            <div>
              <h1>ingredients</h1>
              <Input
                placeholder="List ingredients"
                className="w-[420px] h-[74px]"
              />
            </div>
            <div>
              <h1>food image</h1>
              <div className="w-[420px] bg-gray-200 h-[138px] flex justify-center rounded-xl items-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-orange-400 text-4xl">
                    <ImageInputIcon />
                  </span>
                  <span>Choose a file or drag & drop it here</span>
                </div>
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Add Dish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
