"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "@/lib/type";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const stepTwoSchema = Yup.object({
  password: Yup.string()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байна")
    .required("Нууц үг оруулна уу"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Нууц үг таарахгүй байна") // ✅ 2 нууц үг таарч байна уу
    .required("Нууц үгээ давтан оруулна уу"),
  phoneNumber: Yup.string()
    .required("Утасны дугаар оруулна уу"),
  address: Yup.string()
    .required("Хаяг оруулна уу"),
});

export const StepTwo = ({ formData, setFormData, onSubmit }: StepProps & { onSubmit: () => void }) => {
  const [isChecked, setIsChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: stepTwoSchema,
    onSubmit: (values) => {
      // ✅ formData-д хадгална
      setFormData({
        ...formData,
        password: values.password,
        phoneNumber: values.phoneNumber,
        address: values.address,
      });
      // ✅ Backend руу илгээнэ
      onSubmit();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold sm:text-3xl tracking-tight">
          Create a strong password
        </h1>
        <p className="text-[#71717A] text-base font-inter font-normal">
          Create a strong password with letters, numbers.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#09090B]">Password</Label>
          <Input
            name="password"
            placeholder="Password"
            type={isChecked ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#09090B]">Confirm Password</Label>
          <Input
            name="confirmPassword"
            placeholder="Confirm"
            type={isChecked ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#09090B]">Phone Number</Label>
          <Input
            name="phoneNumber"
            placeholder="99999999"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-sm text-red-500">{formik.errors.phoneNumber}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-[#09090B]">Address</Label>
          <Input
            name="address"
            placeholder="Ulaanbaatar"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-10"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-sm text-red-500">{formik.errors.address}</p>
          )}
        </div>

        {/* Show password */}
        <label className="flex gap-2 select-none items-center cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-[#71717A] text-sm font-normal">Show password</span>
        </label>
      </div>

      <button type="submit" className="w-full h-10 bg-black text-white rounded-md">
        Sign Up
      </button>
    </form>
  );
};