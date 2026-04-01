"use client";
import { useState } from "react";
import Link from "next/link";
import {StepTwo} from "@/app/_component/sign_up/step-two"
import {StepOne} from "@/app/_component/sign_up/step-one"
import { baseUrl, ClientType } from "@/lib/type";
import { useRouter } from "next/navigation";

export interface StepProps {
  formData: ClientType;
  setFormData: React.Dispatch<React.SetStateAction<ClientType>>;
  onSubmit?: (data: ClientType) => void; 
}

export default function SignUp() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<ClientType>({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const signup = async (data: ClientType) => {
    console.log("PAYLOAD:", data); 
    const res = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  };

  const handleSubmit = async (data: ClientType) => {
    try {
      const result = await signup(data);
      console.log("Signup success:", result);
      router.push("/sign_in"); 
    } catch (error) {
      console.error(error);
      alert("Signup амжилтгүй боллоо");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen items-center bg-white">
      <div className="flex flex-col w-full lg:w-1/2 px-6 py-10 justify-center">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">

          {currentIndex === 0 && (
            <StepOne
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentIndex(1)} 
            />
          )}

          {currentIndex === 1 && (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />
          )}

          <div className="flex gap-3 justify-center lg:justify-start mt-2">
            <p className="text-[#71717A] text-base font-normal">
              Already have an account?
            </p>
            <Link href={"/sign_in"}>
              <p className="text-[#2563EB] text-base cursor-pointer font-normal hover:underline">
                Sign in
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