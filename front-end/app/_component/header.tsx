import { Logo } from "../_assets/logo";

export function Header() {
  return (
    <div>
      <div className="bg-[#18181B] w-full flex justify-between px-10 py-2">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="text-white">
            <h1 className="flex gap-1">
              Nom<span className="text-red-300">Nom</span>
            </h1>
            <p>Swift delivery</p>
          </div>
        </div>
        <div className="flex items-center text-sm gap-5">
          <div className="bg-white px-5 flex gap-2 rounded-4xl">
            <span className="text-red-300">Delivery address:</span>
            <span>Add location</span>
          </div>
          <img src="/images/avatar_image.png" alt="" />
        </div>
      </div>
      <div>
        <img src="/images/homepage-cover.png" alt="" />
      </div>
    </div>
  );
}
