"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signInSchema = Yup.object({
  email: Yup.string()
    .email("Email буруу форматтай байна")
    .required("Email оруулна уу"),
  password: Yup.string()
    .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байна")
    .required("Нууц үг оруулна уу"),
});

export const LoginStepOne = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signInSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await signInApi({ email: values.email, password: values.password });

        localStorage.setItem("token", data.token);

        router.push("/");

      } catch (error: any) {

        if (error.message === "user does not exist") {
          setErrors({ email: "Энэ email бүртгэлгүй байна" });
        } else if (error.message === "password does not match") {
          setErrors({ password: "Нууц үг буруу байна" });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:mx-0">
        <div>
          <h1 className="text-[#09090B] font-inter text-2xl font-semibold sm:text-3xl tracking-tight">
            Log in
          </h1>
          <p className="text-[#71717A] text-base font-inter font-normal">
            Log in to enjoy your favorite dishes.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {/* Email */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="for@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
        </div>

        {/* Submit товч */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full h-10 bg-black text-white rounded-md"
        >
          {formik.isSubmitting ? "Түр хүлээнэ үү..." : "Log in"}
        </button>
      </div>
    </form>
  );
};
