import * as yup from "yup";

export const accountDeleteValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters maximum")
    .required("Password is required"),
});
