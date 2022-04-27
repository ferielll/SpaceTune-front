import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
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
      <h1 className="text-5xl text-center mt-5 ">Home</h1>
      <div className="grid grid-cols-4 gap-4">
        {tracks.map((p) => (
          <Track track={p} />
        ))}
      </div>
    </div>
  );
}
