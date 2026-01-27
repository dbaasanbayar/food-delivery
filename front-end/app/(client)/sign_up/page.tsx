"use client";

import { ButtonForward } from "@/app/_component/forward_button";
import { ButtonBackWard } from "@/app/_component/back_button";
import { useState } from "react";
import { stepOne } from "../../_component/sign_up/Stepone";
import { stepTwo } from "../../_component/sign_up/StepTwo";
import Link from "next/link";
import { baseUrl, ClientType } from "@/lib/type";
import { error } from "console";

export default function SignUp() {
  const [currenIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<ClientType>({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const steps = [stepOne, stepTwo];
  const CurrentStep = steps[currenIndex];

  const signup = async (data: ClientType) => {
    const res = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }
    return res.json();
  };

  const handleSubmit = async () => {
    try {
      const result = await signup(formData);
      console.log("Signup success:", result);
      localStorage.setItem("token", result.token);

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  // const isLastStep = currenIndex === 1;

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen items-center bg-white">
      <div className="flex flex-col w-full lg:w-1/2 px-6 py-10 justify-center">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">
          <ButtonBackWard
            setCurrentIndex={setCurrentIndex}
            currentIndex={currenIndex}
          />
          <div className="w-full">
            <CurrentStep formData={formData} setFormData={setFormData} />
          </div>
          <ButtonForward
            handleSubmit={handleSubmit}
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
