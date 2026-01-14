"use client";
import { useEffect, useState } from "react";
import { baseUrl, DishType } from "@/lib/type";
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
export const AddCategories = () => {
  const [categoryName, setCategoryName] = useState("");

  const AddCategory = async () => {
    try {
      const response = await fetch(`${baseUrl}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      const data = await response.json();
      console.log("category added:", data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <AlertDialogDescription>Category name</AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder="Type category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={AddCategory}>
            Add category
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
