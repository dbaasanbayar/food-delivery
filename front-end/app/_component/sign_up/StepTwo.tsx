import { Input } from "@/app/_component/input";
import { useState } from "react";
export const stepTwo = () => {
  const [isChecked, SetIsChecked] = useState<boolean>(false);

  console.log({ isChecked });

  const handleChange = (event: any) => {
    SetIsChecked(event.target.checked);
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold">
          Create a strong password
        </h1>
        <p className="text-[#71717A] text-[16px] font-inter font-normal">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input placeholder="Password" type={isChecked ? "text" : "password"} />
        <Input placeholder="Confirm" type={isChecked ? "text" : "password"} />

        <label className="flex gap-2 select-none">
          <input type="checkbox" checked={isChecked} onChange={handleChange} />
          <div className="text-[#71717A] text-[14px] font-normal">
            Show password
          </div>
        </label>
      </div>
    </div>
  );
};
