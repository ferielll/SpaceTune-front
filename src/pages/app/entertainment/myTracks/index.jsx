import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useUser } from "../../../../hooks/useUser";
import Track from "../Track";

export default function MyTracks() {
    const { user } = useUser();
    const [tracks,setTracks]=useState([])
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
            setTracks(res.data.content)
          })
      );
    return (
        <div>
            <h1 className="text-5xl text-center mt-5 ">My Tracks</h1>
            <div className="grid grid-cols-4 gap-4">
            {tracks.map((p) => ( <Track track={p}  />
            ))}
 </div>

</div>
    )
}