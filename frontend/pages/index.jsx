import ProfileCard from "../components/ProfileCard";
import ReactionButtonGroup from "../components/ReactionButtonGroup";

const Home = () => {
  return (
    <>
      <section className="grid place-items-center">
        <ProfileCard />
        <ReactionButtonGroup />
      </section>
    </>
  );
};

export default Home;
