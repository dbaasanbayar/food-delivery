import { useEffect, useState } from "react";
import { Logo } from "../_assets/logo";
import { DishType, baseUrl } from "@/lib/type";

export function Footer() {
  const [foods, setFoods] = useState<DishType[]>([]);
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`${baseUrl}/food`);
        const data = await response.json();
        setFoods(data); 
      } catch (error) {
        console.error("Өгөгдөл татахад алдаа гарлаа:", error)
      }
    };
    fetchFoods(); 
  }, [])


  return (
    <div className="flex py-10 flex-col text-white bg-black overflow-hidden">
      <div className="flex bg-red-300 overflow-hidden md:py-5 border-y">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="mx-4 text-lg md:text-2xl font-bold italic tracking-tighter uppercase"
            >
              Fresh fast delivered •
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="mx-4 text-lg md:text-2xl font-bold italic tracking-tighter uppercase"
            >
              Fresh fast delivered •
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 md:px-10">
        <div className="flex justify-between md:flex-row border-white/20 border-b py-10 gap-5">
          <div className="flex flex-col gap-2">
            <Logo />
            <div className="text-xl font-bold">
              Nom<span className="text-red-300">Nom</span>
              <p className="text-sm font-normal text-gray-400">
                Swift delivery
              </p>
            </div>
          </div>
          <div>
            <h1 className="mb-3 font-bold text-red-300">NOMNOM</h1>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Home</li>
              <li>Contact us</li>
              <li>Delivery zone</li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold mb-3 text-red-300">MENU</h1>
            <ul className="space-y-2 text-gray-300 text-sm">
          {foods.map((food) => (
            <li key={food._id}>{food.name}</li>
          ))}
        </ul>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold mb-3 text-red-300 uppercase">FOLLOW US</h1>
            <div className="flex gap-4">
              <img className="w-7 h-7" src="/images/icon_fb.png" alt="fb" />
              <img
                className="w-7 h-7"
                src="/images/icon_intsa.png"
                alt="insta"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 pt-8 text-xs md:text-sm text-gray-500 pb-20">
          <p className="hover:text-white cursor-pointer">
            Copy right 2024 © Nomnom LLC
          </p>
          <p className="hover:text-white cursor-pointer">Privacy policy </p>
          <p className="hover:text-white cursor-pointer">Terms and conditoin</p>
          <p className="hover:text-white cursor-pointer">Cookie policy</p>
        </div>
      </div>
    </div>
  );
}
