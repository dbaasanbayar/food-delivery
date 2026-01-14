"use client";
import { Input } from "@/app/_component/input";
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
    <div className="flex w-full items-center">
      <div className="ml-[100px] w-32% flex flex-col gap-6">
        <ButtonBackWard
          setCurrentIndex={setCurrentIndex}
          currentIndex={currenIndex}
        />
        <div>
          <CurrentStep />
        </div>
        <ButtonForward
          setCurrentIndex={setCurrentIndex}
          currentIndex={currenIndex}
        />
        <div className="flex gap-3 justify-center">
          <p className="text-[#71717A] text-[16px] font-normal">
            Already have an account?
          </p>
          <Link href={"/login"}>
            <p className="text-[#2563EB] text-[16px] cursor-pointer font-normal">
              Log in
            </p>
          </Link>
        </div>
      </div>
      <img
        className="ml-7 m-5 w-full max-w-full rounded-2xl aspect-square object-contain"
        src="/images/entry_logo.jpg"
        alt="entry_logo"
      />
    </div>
  );
}
