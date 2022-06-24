import { MatchRow } from "../components/MatchRow";
import { ReactionsCarousel } from "../components/ReactionsCarousel";
import { getReactions } from "../utils/api/get-reactions";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Matches = () => {
  const { accessToken, setError } = useAuth();
  const [reactions, setReactions] = useState();

  const matches = [];

  useEffect(() => {
    (async () => {
      if (!reactions) {
        const { reactions: fetchedReactions, error: fetchError } = await getReactions(accessToken);

        if (fetchError) {
          setError(fetchError);
          setTimeout(() => {
            setError();
          }, 3000);
        }

        setReactions(fetchedReactions ?? []);
      }
    })();
  }, []);

  return (
    <div className="grid place-items-center">
      <div className="card w-auto mt-8 bg-base-100 mx-3">
        <div className="text-left ">
          <div className="text-lg font-extrabold px-4">
            Reactions
            <div className="badge badge-primary mx-2">{reactions?.length}</div>
          </div>
        </div>

        <ReactionsCarousel reactions={reactions} />

        <div className="text-left ">
          <div className="text-lg font-extrabold px-4">
            Matches
            <div className="badge badge-secondary mx-2">{matches.length}</div>
          </div>
        </div>

        {matches.map((match, index) => (
          <MatchRow key={index} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
