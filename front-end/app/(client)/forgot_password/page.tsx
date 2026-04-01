"use client";
import { useState } from "react";
import Link from "next/link";
import { ForgotStepOne } from "@/app/_component/forgot_pass/ForgotStepOne";
import { ForgotStepTwo } from "@/app/_component/forgot_pass/ForgotStepTwo";
import { ForgotStepThree } from "@/app/_component/forgot_pass/ForgotStepThree";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="flex w-full flex-col bg-white lg:flex-row px-6 py-10 sm:px-12 min-h-screen items-center">
      <div className="flex flex-col justify-center w-full lg:w-[40%]">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">

          {step === 1 && (
            <ForgotStepOne
              onNext={(receivedEmail) => {
                setEmail(receivedEmail); // ✅ email хадгална
                setStep(2);             // ✅ step 2 руу
              }}
            />
          )}

          {step === 2 && (
            <ForgotStepTwo
              email={email}
              onNext={(receivedOtp) => {
                setOtp(receivedOtp); // ✅ OTP хадгална
                setStep(3);          // ✅ step 3 руу
              }}
            />
          )}

          {step === 3 && (
            <ForgotStepThree
              email={email}
              otp={otp}
            />
          )}

          <Link href="/sign_in" className="text-sm mt-2 text-center underline">
            Back to sign in
          </Link>
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
