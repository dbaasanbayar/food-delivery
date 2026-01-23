import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="flex w-full flex-col bg-white lg:flex-row px-6 py-10 sm:px-12 min-h-screen items-center">
      <div className="flex flex-col justify-center w-full lg:w-[40%]">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">
          <div>
            <h1 className="text-[#09090B] text-2xl font-semibold sm:text-3xl">
              Reset your password
            </h1>
            <p className="text-[#71717A] text-base">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Input
                type="email"
                placeholder="for@example.com"
                className="h-11 w-full border rounded-md px-3 border-[#E4E4E7]"
              />
            </div>
            <Button className="w-full h-11 bg-[#18181B] text-white rounded-md font-medium">
              Send Link
            </Button>
          </div>
        </div>
        <Link href="/login" className="text-sm mt-2 text-center underline">
          Back to log in
        </Link>
      </div>
      <div className="hidden lg:flex w-[60%] p-4 h-screen sticky top-0">
        <img
          className="w-full object-cover rounded-3xl h-full"
          src="/images/entry_logo.jpg"
          alt="entry_logo"
        />
      </div>
    </div>
  );
}
