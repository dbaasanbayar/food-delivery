"use client";
import { Input } from "@/app/_component/input";
import { ButtonForward } from "@/app/_component/button";
import { useState } from "react";

export default function SignUp() {
  // const signup = async()=>{
  //     const res = axios.post("localhost",{
  //         email,
  //         password
  //     })

  const onClickButton = (event) => {
    event.preventDefault();
    console.log(event.target.name.value);
  };

  return (
    <div className="flex w-full items-center">
      <div className="ml-[100px] w-32% flex flex-col gap-6">
        <div className="border  w-fit px-4 py-2 rounded-[6px] cursor-pointer">
          <img src="/images/chevron-left.png" alt="" />
        </div>
        <div>
          <h1 className="text-[#09090B] font-inter text-2xl font-semibold">
            Create your account
          </h1>
          <p className="text-[#71717A] text-[16px] font-inter font-normal">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        <form
          className="flex flex-col gap-6"
          action=""
          onSubmit={onClickButton}
        >
          <Input name />
          <ButtonForward />
        </form>
        <div className="flex gap-3 justify-center">
          <p className="text-[#71717A] text-[16px] font-normal">
            Already have an account?
          </p>
          <p className="text-[#2563EB] text-[16px] cursor-pointer font-normal">
            Log in
          </p>
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
