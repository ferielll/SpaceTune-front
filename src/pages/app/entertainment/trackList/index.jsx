import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Title from "../../../../components/Title";
import Track from "../Track";

export default function TrackList() {
  const [tracks, setTracks] = useState([]);
  const {
    data: Tracks,
    isLoading,
    refetch,
  } = useQuery(["fetchAllTracks"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/track/getRandomTracks`)
      .then((res) => {
        setTracks(res.data.content);
      })
  );
  return (
    <div>
      <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
        <Title title="Tracks" subtitle="Listen to your favorite track." />
        <div className="grid grid-cols-4 gap-4">
          {tracks.map((p) => (
            <Track track={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
