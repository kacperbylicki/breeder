import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = () => {
  const { profile } = useAuth();
  const [isEditing, setEditing] = useState(false);

  const capitalizeFirstLetter = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  const [city, country] = profile.location.split(",");
  const today = new Date();

  const validationSchema = yup.object().shape({
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

  const defaultValues = { ...profile, gender: capitalizeFirstLetter(profile.gender) };
  const formOptions = {
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  const PresentationStateFields = () => (
    <section className="p-8">
      <div className="text-left">
        <div className="text-xl font-extrabold">
          {capitalizeFirstLetter(profile.name)}
          <span className="ml-2 text-primary">{profile.age}</span>
        </div>

        <section className="space-x-2">
          <div className="badge badge-lg mt-4 gap-2">
            Breed <span className="font-extrabold">{profile.breed}</span>
          </div>

          <div className="badge badge-lg mt-4 gap-2">
            Gender
            <span className="font-extrabold">{capitalizeFirstLetter(profile.gender)}</span>
          </div>

          <div className="badge badge-lg mt-4 gap-2">
            <span className="font-extrabold">{city}</span>
            {country}
          </div>
        </section>
      </div>
    </section>
  );

  const EditingStateFields = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="grid place-items-center">
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

        <select
          className={`select  ${
            errors.breed ? "select-error" : "select-primary"
          } w-full max-w-xs mt-6`}
          {...register("gender")}
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
      </section>
      <section className="flex justify-end">
        <input
          className="btn btn-sm btn-link text-neutral mt-8 mr-2"
          type="reset"
          value="Cancel"
          onClick={() => setEditing(false)}
        />
        <button className="btn btn-sm mt-8" onClick={() => setEditing(true)}>
          Save
        </button>
      </section>
    </form>
  );

  return (
    <div className="card w-auto mt-8 bg-base-100 shadow-xl mx-3">
      {!isEditing && (
        <section className="grid place-items-end p-4">
          <button className="btn btn-sm" onClick={() => setEditing(true)}>
            Edit
          </button>
        </section>
      )}
      <section className="grid place-items-center mt-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://api.lorem.space/image/face?hash=3174" />
          </div>
        </div>
      </section>
      <section className="grid p-4">
        {isEditing ? <EditingStateFields /> : <PresentationStateFields />}
      </section>
    </div>
  );
};

export default Profile;
