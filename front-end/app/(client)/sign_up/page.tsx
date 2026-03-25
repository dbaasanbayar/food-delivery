"use client";
import { useState } from "react";
import Link from "next/link";
import {StepTwo} from "@/app/_component/sign_up/step-two"
import {StepOne} from "@/app/_component/sign_up/step-one"
import { baseUrl, ClientType } from "@/lib/type";
import { useRouter } from "next/navigation";

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
    const res = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  };

  const handleSubmit = async () => {
    try {
      const result = await signup(formData);
      console.log("Signup success:", result);
      router.push("/login"); // ✅ window.location → router.push болгов
    } catch (error) {
      console.error(error);
      alert("Signup амжилтгүй боллоо");
    }
  };

  // ✅ ButtonForward/Backward устгаж, step-ийг component өөрөө удирдана
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen items-center bg-white">
      <div className="flex flex-col w-full lg:w-1/2 px-6 py-10 justify-center">
        <div className="flex flex-col gap-6 w-full max-w-[416px] mx-auto lg:mx-0">

          {currentIndex === 0 && (
            <StepOne
              formData={formData}
              setFormData={setFormData}
              onNext={() => setCurrentIndex(1)} // ✅ Step 2 руу
            />
          )}

          {currentIndex === 1 && (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit} // ✅ Backend руу илгээнэ
            />
          )}

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