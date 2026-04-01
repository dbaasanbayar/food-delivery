"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPasswordApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  email: string;
  otp: string;
};

const schema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байна")
    .required("Нууц үг оруулна уу"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Нууц үг таарахгүй байна")
    .required("Нууц үгээ давтан оруулна уу"),
});

export const ForgotStepThree = ({ email, otp }: Props) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await resetPasswordApi({ email, otp, newPassword: values.newPassword });
        router.push("/sign_in"); 
      } catch (error: any) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div>
        <h1 className="text-[#09090B] text-2xl font-semibold sm:text-3xl">
          Create new password
        </h1>
        <p className="text-[#71717A] text-base">
          Шинэ нууц үгээ оруулна уу.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="newPassword">Шинэ нууц үг</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type={isChecked ? "text" : "password"}
            placeholder="••••••"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-11 w-full border-[#E4E4E7]"
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Нууц үг давтах</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={isChecked ? "text" : "password"}
            placeholder="••••••"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-11 w-full border-[#E4E4E7]"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* Show password */}
        <label className="flex gap-2 items-center cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4 cursor-pointer"
          />
          <span className="text-[#71717A] text-sm">Show password</span>
        </label>
      </div>

      <Button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full h-11 bg-[#18181B] text-white rounded-md"
      >
        {formik.isSubmitting ? "Хадгалж байна..." : "Reset Password"}
      </Button>
    </form>
  );
};