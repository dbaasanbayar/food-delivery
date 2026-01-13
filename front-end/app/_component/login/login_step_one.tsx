import { Input } from "@/app/_component/input";
import { ButtonForward } from "@/app/_component/forward_button";
export const LoginStepOne = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold">
          Log in
        </h1>
        <p className="text-[#71717A] text-[16px] font-inter font-normal">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input text="Enter your email address" />
        <Input text="Password" />
      </div>
    </div>
  );
};
