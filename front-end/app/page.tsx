"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FoodWithCategory } from "./_component/foods_with_category";
import { Footer } from "./_component/footer";
import { Header } from "./_component/header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/sign_in");
    }
  }, []);

  return (
    <div>
      <Header />
      <FoodWithCategory />
      <Footer />
    </div>
  );
}
