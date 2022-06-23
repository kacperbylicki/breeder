import Image from "next/image";

const ProfileCard = () => {
  return (
    <>
      <div className="card w-auto mt-8 bg-base-100 shadow-xl mx-3">
        <figure>
          <Image
            src="https://api.lorem.space/image/shoes?w=400&h=400"
            alt="Shoes"
            width="400"
            height="400"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
