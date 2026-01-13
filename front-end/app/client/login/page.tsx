"use client";
import { ButtonForward } from "@/app/_component/forward_button";
import { ButtonBackWard } from "@/app/_component/back_button";
import { useState } from "react";
import Link from "next/link";
import { LoginStepOne } from "@/app/_component/login/login_step_one";

export default function SignUp() {
  const [currenIndex, setCurrentIndex] = useState(0);

  const CurrentStep = [LoginStepOne][currenIndex];

  return (
    <div className="flex w-full items-center">
      <div className="ml-[100px] w-[32%] flex flex-col gap-6">
        <ButtonBackWard />
        <CurrentStep />

        <button className="text-[#18181B] cursor-pointer font-normal underline text-sm decoration-solid flex">
          <p onClick={() => setCurrentIndex(currenIndex + 1)}>
            Forgot password ?
          </p>
        </button>
        <ButtonForward />
        <div className="flex gap-3 justify-center">
          <p className="text-[#71717A] text-[16px] font-normal">
            Don’t have an account?
          </p>
          <Link href={"/client/sign_up"}>
            <p className="text-[#2563EB] text-[16px] cursor-pointer font-normal">
              Sign up
            </p>
          </Link>
        </div>
      </div>
      <img
        className="ml-7 m-5 w-[68%] rounded-2xl h-[904px]"
        src="/images/entry_logo.jpg"
        alt="entry_logo"
      />
    </div>
  );
}
