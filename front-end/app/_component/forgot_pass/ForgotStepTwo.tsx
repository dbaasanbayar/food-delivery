"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyOTPApi } from "@/lib/api";

type Props = {
  email: string;
  onNext: (otp: string) => void; // ← OTP-г дараагийн step-т дамжуулна
};

const schema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP 6 оронтой байх ёстой")
    .required("OTP оруулна уу"),
});

export const ForgotStepTwo = ({ email, onNext }: Props) => {
  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await verifyOTPApi({ email, otp: values.otp });
        onNext(values.otp); // ✅ OTP-г дамжуулж step 3 руу шилжинэ
      } catch (error: any) {
        setErrors({ otp: "OTP буруу байна" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div>
        <h1 className="text-[#09090B] text-2xl font-semibold sm:text-3xl">
          Enter OTP code
        </h1>
        <p className="text-[#71717A] text-base">
          {email} руу илгээсэн 6 оронтой кодоо оруулна уу.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="otp">OTP код</Label>
        <Input
          id="otp"
          name="otp"
          type="text"
          placeholder="123456"
          maxLength={6}
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-11 w-full border-[#E4E4E7] tracking-widest text-center text-lg"
        />
        {formik.touched.otp && formik.errors.otp && (
          <p className="text-sm text-red-500">{formik.errors.otp}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full h-11 bg-[#18181B] text-white rounded-md"
      >
        {formik.isSubmitting ? "Шалгаж байна..." : "Verify OTP"}
      </Button>
    </form>
  );
};