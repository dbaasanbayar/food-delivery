import { Input } from "@/app/_component/input";

export const stepOne = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold">
          Create your account
        </h1>
        <p className="text-[#71717A] text-[16px] font-inter font-normal">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <Input text="Enter your email address" />
    </div>
  );
};
