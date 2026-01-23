import { Input } from "@/components/ui/input";
import { useState } from "react";
export const stepTwo = () => {
  const [isChecked, SetIsChecked] = useState<boolean>(false);

  console.log({ isChecked });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetIsChecked(event.target.checked);
  };
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold sm:text-3xl tracking-tight">
          Create a strong password
        </h1>
        <p className="text-[#71717A] text-base font-inter font-normal">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          className="w-full h-10"
          placeholder="Password"
          type={isChecked ? "text" : "password"}
        />
        <Input
          className="w-full h-10"
          placeholder="Confirm"
          type={isChecked ? "text" : "password"}
        />
        <label className="flex gap-2 select-none items-center cursor-pointer group w-fit">
          <input
            className="w-4 h-4 rounded border-gray-300 text-[#18181B] focus:ring-[$18181B] cursor-pointer"
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
          <span className="text-[#71717A] text-sm font-normal group-hover:text-[#18181B]">
            Show password
          </span>
        </label>
      </div>
    </div>
  );
};
