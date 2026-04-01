"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPasswordApi } from "@/lib/api";

type Props = {
    onNext: (email: string) => void; 
};

const schema = Yup.object({
    email: Yup.string()
        .email("Email буруу форматтай байна")
        .required("Email оруулна уу"),
});

export const ForgotStepOne = ({ onNext }: Props) => {
    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
          try {
            await forgotPasswordApi({ email: values.email });
            onNext(values.email); 
          } catch (error: any) {
            if (error.message === "user does not exist") {
              setErrors({ email: "Энэ email бүртгэлгүй байна" });
            }
          } finally {
            setSubmitting(false);
          }
        },
      });
      
      return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <h1 className="text-[#09090B] text-2xl font-semibold sm:text-3xl">
              Reset your password
            </h1>
            <p className="text-[#71717A] text-base">
              Enter your email to receive an OTP code.
            </p>
          </div>
    
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="for@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="h-11 w-full border-[#E4E4E7]"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
    
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full h-11 bg-[#18181B] text-white rounded-md"
          >
            {formik.isSubmitting ? "Илгээж байна..." : "Send OTP"}
          </Button>
        </form>
      );

}