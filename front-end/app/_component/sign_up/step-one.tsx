"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from "@/lib/type";
import { useFormik } from "formik";
import * as Yup from "yup";

const stepOneSchema = Yup.object({
  email: Yup.string()
    .email("Email буруу форматтай байна")
    .required("Email оруулна уу"),
});

export const StepOne = ({ formData, setFormData, onNext }: StepProps & { onNext: () => void }) => {
  const formik = useFormik({
    initialValues: { email: formData.email },
    validationSchema: stepOneSchema,
    onSubmit: (values) => {
      // ✅ formData-д хадгална
      setFormData({ ...formData, email: values.email });
      // ✅ Step 2 руу шилжинэ
      onNext();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-[#09090B] font-inter text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your account
        </h1>
        <p className="text-[#71717A] text-base font-inter font-normal">
          Sign up to explore your favorite dishes.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-[#09090B]">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="for@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-10 w-full"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}
      </div>

      <button type="submit" className="w-full h-10 bg-black text-white rounded-md">
        Continue
      </button>
    </form>
  );
};