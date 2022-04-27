import { Empty } from "antd";
import axios from "axios";
import { Fragment } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Breadcrumb from "../../../../components/Breadcrum";
import Title from "../../../../components/Title";
import { useUser } from "../../../../hooks/useUser";
import Track from "../Track";

export default function MyTracks() {
  const { user } = useUser();
  const [tracks, setTracks] = useState([]);
  const {
    data: Tracks,
    isLoading,
    refetch,
  } = useQuery(["fetchMyTracks"], () =>
    axios
      .get(
        `http://localhost:3000/spacetune/api/track/getTracksByUserId/${user._id}`
      )
      .then((res) => {
        setTracks(res.data.content);
      })
  );
  //
  return (
    <div className="mt-4 mx-6 w-full max-w-7xl lg:px-4">
      <div className="flex justify-between text-start w-full">
        <Title title="My tracks" subtitle="Listen to your favorite music" />
      </div>
      {isLoading ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((p, index) => (
            <Track key={index} track={p} />
          ))}
        </div>
      )}
    </div>
  );
}
