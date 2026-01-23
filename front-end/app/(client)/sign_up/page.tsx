"use client";

import { ButtonForward } from "@/app/_component/forward_button";
import { ButtonBackWard } from "@/app/_component/back_button";
import { useState } from "react";
import { stepOne } from "../../_component/sign_up/Stepone";
import { stepTwo } from "../../_component/sign_up/StepTwo";
import Link from "next/link";

export default function SignUp() {
  const [currenIndex, setCurrentIndex] = useState(0);
  const CurrentStep = [stepOne, stepTwo][currenIndex];
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen items-center bg-white">
      <div className="flex flex-col w-full lg:w-1/2 px-6 py-10 justify-center">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">
          <ButtonBackWard
            setCurrentIndex={setCurrentIndex}
            currentIndex={currenIndex}
          />
          <div className="w-full">
            <CurrentStep />
          </div>
          <ButtonForward
            setCurrentIndex={setCurrentIndex}
            currentIndex={currenIndex}
          />
          <div className="flex gap-3 justify-center lg:justify-start mt-2">
            <p className="text-[#71717A] text-base font-normal">
              Already have an account?
            </p>
            <Link href={"/login"}>
              <p className="text-[#2563EB] text-base cursor-pointer font-normal hover:underline">
                Log in
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 h-screen p-6 items-center">
        <img
          className="w-full h-full rounded-3xl object-cover"
          src="/images/entry_logo.jpg"
          alt="entry_logo"
        />
      </div>
    </div>
  );
}
