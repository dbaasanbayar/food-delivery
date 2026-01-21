import { Logo } from "./_assets/logo";
import { FoodWithCategory } from "./_component/foods_with_category";

export default function Home() {
  return (
    <div>
      <div className="bg-[#18181B] w-full flex justify-between px-10">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="text-white">
            <h1 className="flex gap-1">
              Nom<span className="text-red-400">Nom</span>
            </h1>
            <p>Swift delivery</p>
          </div>
        </div>
        <div className="flex items-center text-sm gap-5">
          <div className="bg-white px-5 flex gap-2 rounded-4xl">
            <span className="text-red-400">Delivery address:</span>
            <span>Add location</span>
          </div>
          <img src="/images/avatar_image.png" alt="" />
        </div>
      </div>
      <div>
        <img src="/images/homepage-cover.png" alt="" />
      </div>
      <FoodWithCategory />
    </div>
  );
}
