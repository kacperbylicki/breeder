import * as yup from "yup";
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter";
import { getBreeds } from "../utils/api/get-breeds";
import { splitByComma } from "../helpers/split-by-comma";
import { updateProfile } from "../utils/api/update-profile";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = () => {
  const { profile, accessToken, setError, setProfile } = useAuth();
  const [isEditing, setEditing] = useState(false);
  const [breedList, setBreedList] = useState();

  const [city, country] = splitByComma(profile.location);
  const today = new Date();

  useEffect(() => {
    (async () => {
      if (!breedList) {
        const { breeds, error } = await getBreeds(accessToken);

        if (error) {
          setError(error);
          setTimeout(() => {
            setError();
          }, 3000);
        }

        setBreedList(breeds ?? []);
      }
    })();
  }, [breedList]);

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
    gender: yup.mixed().oneOf(["female", "male"]),
    location: yup
      .string()
      .min(6, "Location must be at least 6 characters")
      .max(64, "Location must be 64 characters maximum")
      .required("Location is required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => profile, [profile]),
  };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    const { profile, error: updateError } = await updateProfile(data);

    if (updateError) {
      setError(updateError);
      setTimeout(() => {
        setError();
      }, 3000);
    }

    setProfile(profile);
    setEditing(false);
  };

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
            <img src="/assets/images/akita.webp" />
          </div>
        </div>
      </section>
      <section className="grid p-4">
        {isEditing ? (
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
                {breedList.map((breed, index) => (
                  <option key={index} value={breed}>
                    {breed}
                  </option>
                ))}
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
                <option value="female">Female</option>
                <option value="male">Male</option>
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
              <button
                className="btn btn-sm btn-link text-neutral mt-8 mr-2"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-sm mt-8">
                Save
              </button>
            </section>
          </form>
        ) : (
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
        )}
      </section>
    </div>
  );
};

export default Profile;
