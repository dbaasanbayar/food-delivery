import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const stepOne = () => {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your account
        </h1>
        <p className="text-[#71717A] text-base font-inter font-normal">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        {/* <Label htmlFor="email" className="text-sm font-medium text-[#09090B]">
          Email Address
        </Label> */}
        <Input
          id="email"
          type="email"
          placeholder="for@example.com"
          className="h-10 w-full bg-white border-[#E4E4E7] transition-all focus-visible:ring-1 focus-visible:ring-[#18181B]"
        />
      </div>
    </div>
  );
};
