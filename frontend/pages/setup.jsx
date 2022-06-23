import Image from "next/image";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Setup = () => {
  const today = new Date();
  const fileSize = 160 * 1024;
  const supportedFormats = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

  const validationSchema = yup.object().shape({
    avatar: yup
      .mixed()
      .test("fileSize", "Image too large", (value) => value && value.size <= fileSize)
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) => value && supportedFormats.includes(value.type),
      ),
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
    gender: yup.mixed().oneOf(["Female", "Male"]),
    location: yup
      .string()
      .min(6, "Location must be at least 6 characters")
      .max(64, "Location must be 64 characters maximum")
      .required("Location is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="grid place-items-center">
          <label htmlFor="avatar" className="btn btn-lg btn-ghost btn-circle avatar">
            <div
              className={`w-24 rounded-full ring ${
                errors.avatar ? "ring-error" : "ring-primary"
              } ring-offset-base-100 ring-offset-2`}
            >
              <Image
                src="https://api.lorem.space/image/face?hash=33791"
                alt="profile image"
                width="100"
                height="100"
              />
            </div>
          </label>
          {errors.avatar?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.avatar?.message}</span>
            </label>
          ) : null}
          <input id="avatar" type="file" className="hidden" />

          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={`input input-bordered ${
              errors.email ? "input-error" : "input-primary"
            } w-full max-w-xs mt-10`}
          />
          {errors.name?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.name?.message}</span>
            </label>
          ) : null}

          <select
            className={`select  ${
              errors.breed ? "select-error" : "select-primary"
            } w-full max-w-xs mt-6`}
            {...register("breed")}
            value="placeholder"
          >
            <option disabled value="placeholder">
              Choose breed
            </option>
            <option>Game of Thrones</option>
            <option>Lost</option>
            <option>Breaking Bad</option>
            <option>Walking Dead</option>
          </select>
          {errors.breed?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.breed?.message}</span>
            </label>
          ) : null}

          <input
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder="Date of birth"
            {...register("dateOfBirth")}
            className={`input input-bordered ${
              errors.dateOfBirth ? "input-error" : "input-primary"
            } w-full max-w-xs mt-6`}
          />
          {errors.dateOfBirth?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.dateOfBirth?.message}</span>
            </label>
          ) : null}

          <select
            className={`select  ${
              errors.breed ? "select-error" : "select-primary"
            } w-full max-w-xs mt-6`}
            {...register("gender")}
            value="placeholder"
          >
            <option disabled value="placeholder">
              Choose gender
            </option>
            <option>Female</option>
            <option>Male</option>
          </select>
          {errors.gender?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.gender?.message}</span>
            </label>
          ) : null}

          <input
            type="text"
            placeholder="City, Country"
            {...register("location")}
            className={`input input-bordered ${
              errors.location ? "input-error" : "input-primary"
            } w-full max-w-xs mt-6`}
          />
          {errors.location?.message ? (
            <label className="label">
              <span className="label-text-alt text-error">{errors.location?.message}</span>
            </label>
          ) : null}

          <button className="btn btn-primary btn-wide mt-6 w-80">Save</button>
        </section>
      </form>
    </>
  );
};

export default Setup;
