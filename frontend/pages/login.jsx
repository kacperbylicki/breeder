import ErrorAlert from "../components/ErrorAlert";
import Link from "next/link";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be 64 characters maximum")
      .required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const { login, error: loginError } = useAuth();

  const onSubmit = (data) => login(data);

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
          <p className="mt-4 text-xs">
            No account yet?
            <Link href="/register">
              <a className="link link-hover ml-1">Register</a>
            </Link>
          </p>
          <button className="btn btn-primary btn-wide mt-4 w-80">Login</button>
        </section>
      </form>
      {loginError && (
        <ErrorAlert
          message={
            loginError.statusCode === 401 ? "Invalid email or password" : "Unknown error occurred"
          }
        />
      )}
    </>
  );
};

export default Login;
