"use client";
import { useState } from "react";
import Link from "next/link";
import { LoginStepOne } from "@/app/_component/sign-in/sign-in";

export default function Login() {
  // ButtonForward, ButtonBackward УСТГАНА
  // Учир нь шилжилтийг LoginStepOne өөрөө хийнэ

  return (
    <div className="flex w-full flex-col bg-white lg:flex-row px-6 py-10 sm:px-12 min-h-screen items-center">
      <div className="flex flex-col justify-center w-full lg:w-[40%]">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">

          <LoginStepOne />

          <Link href={"/forgot_password"}>
            <span className="underline text-sm">Forgot password?</span>
          </Link>

          <div className="flex gap-2 justify-center lg:justify-start mt-2">
            <p className="text-[#71717A] text-[16px] font-normal">
              Don't have an account?
            </p>
            <Link href={"/sign_up"}>
              <span className="text-[#2563EB] text-base cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </div>

        </div>
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