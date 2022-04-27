import { Empty } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import Title from "../../../../components/Title";
import { useUser } from "../../../../hooks/useUser";
import Track from "../Track";
export default function LikedTracks() {
  const {user} = useUser();
  const {
    data: Tracks,
    isLoading,
    refetch,
  } = useQuery(["LikesTracks"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/track/favorites/${user._id}`)
      .then((res) => res.data)
  );
  console.log(Tracks,'tracks')
  return (
    <div>
      <div className="mt-4 mx-6 w-full max-w-7xl lg:px-4">
        <div className="flex justify-between text-start w-full">
          <Title title="Favorites tracks" />
        </div>
        {isLoading ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Tracks && Tracks.map((p) => (
              <Track track={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
