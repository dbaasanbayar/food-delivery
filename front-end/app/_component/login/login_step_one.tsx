import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginStepOne = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold sm:text-3xl tracking-tight">
          Log in
        </h1>
        <p className="text-[#71717A] text-base font-inter font-normal">
          Log in to enjoy your favorite dishes.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-[#09090B]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="for@example.com"
            className="h-10 w-full transition-all focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-[#09090B]"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-10 w-full border-[#E4E4E7] transition-all focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>
    </div>
  );
};
