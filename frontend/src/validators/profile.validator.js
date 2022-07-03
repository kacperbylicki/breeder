import * as yup from "yup";

const today = new Date();
const fileSize = 4096 * 1024;
const supportedFormats = ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/webp"];

export const createProfileValidationSchema = yup.object().shape({
  avatar: yup
    .mixed()
    .test(
      "fileType",
      "Unsupported Format",
      (value) => !value || supportedFormats.includes(value[0].type),
    )
    .test("fileSize", "Image too large", (value) => !value || value[0].size <= fileSize),
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name must be 64 characters maximum")
    .required("Name is required"),
  breed: yup.string().required("Breed is required"),
  dateOfBirth: yup
    .date()
    .typeError("Must be valid date")
    .max(today, "Date cannot be in the future")
    .required("Date of birth is required"),
  gender: yup.mixed().oneOf(["female", "male"]),
  location: yup
    .string()
    .min(6, "Location must be at least 6 characters")
    .max(64, "Location must be 64 characters maximum")
    .required("Location is required"),
});

export const updateProfileValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name must be 64 characters maximum")
    .required("Name is required"),
  breed: yup.string().required("Breed is required"),
  dateOfBirth: yup
    .date()
    .typeError("Must be valid date")
    .max(today, "Date cannot be in the future")
    .required("Date of birth is required"),
  gender: yup.mixed().oneOf(["female", "male"]),
  location: yup
    .string()
    .min(6, "Location must be at least 6 characters")
    .max(64, "Location must be 64 characters maximum")
    .required("Location is required"),
});
