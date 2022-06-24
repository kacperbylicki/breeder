import ErrorAlert from "../components/ErrorAlert";
import Link from "next/link";
import * as yup from "yup";
import { registerAccount } from "../utils/api/register";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const { error, setError } = useAuth();
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be 64 characters maximum")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    const { error: registrationError } = await registerAccount(data);

    if (registrationError) {
      setError(registrationError);
      setTimeout(() => {
        setError();
      }, 3000);

      return;
    }

    router.push("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid place-items-center">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className={`input input-bordered ${
              errors.email ? "input-error" : "input-primary"
            } w-full max-w-xs mt-10`}
          />
          {errors.email?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.email?.message}</span>
            </label>
          ) : null}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`input input-bordered ${
              errors.password ? "input-error" : "input-primary"
            } w-full max-w-xs mt-6`}
          />
          {errors.password?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.password?.message}</span>
            </label>
          ) : null}
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            className={`input input-bordered ${
              errors.confirmPassword ? "input-error" : "input-primary"
            } w-full max-w-xs mt-6`}
          />
          {errors.confirmPassword?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.confirmPassword?.message}</span>
            </label>
          ) : null}
          <p className="mt-4 text-xs">
            Already have account?
            <Link href="/login">
              <a className="link link-hover ml-1">Login</a>
            </Link>
          </p>
          <button className="btn btn-primary btn-wide mt-4 w-80">Register</button>
        </section>
      </form>
      {error && <ErrorAlert message={error.message} />}
    </>
  );
};

export default Register;
