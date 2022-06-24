import Image from "next/image";
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter";
import { splitByComma } from "../helpers/split-by-comma";

const ProfileCard = ({ profile }) => {
  const [city, country] = splitByComma(profile?.location);

  return (
    <>
      <div className="card card-compact w-auto max-w-[26rem] mt-8 bg-base-100 shadow-xl mx-3">
        <figure>
          <Image src={profile?.avatar} alt="Shoes" width="400" height="400" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {profile?.name}
            <span className="text-primary">{profile?.age}</span>
          </h2>

          <section className="space-x-2 space-y-2">
            <div className="badge badge-md gap-2">
              Breed <span className="font-extrabold">{profile?.breed}</span>
            </div>

            <div className="badge badge-md gap-2">
              Gender
              <span className="font-extrabold">{capitalizeFirstLetter(profile?.gender)}</span>
            </div>

            <div className="badge badge-md gap-2">
              <span className="font-extrabold">{city}</span>
              {country}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
