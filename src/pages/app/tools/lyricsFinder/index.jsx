import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Track from "./Track";
import { Button } from "@mui/material";

const LyricsFinder = () => {
  const [userInput, setUserInput] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
 const [track_list,setTrack_list]=useState([])
 

  const findTrack = e => {
    e.preventDefault();

    axios
    .get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=977816c334068d2c128b3f32578cc04d`
    )
    .then(res => {
        console.log("tes",res)
        setTrack_list(res.data.message.body.track_list);
      //setState({ track_list: track_list, heading: "Search Results" });
    })
    .catch(err => console.log(err));
  };

  const onChange = e => {
    setTrackTitle(e.target.value);

  };

  return (
    <div className="card card-body mb-4 p-4 text-center box grid place-items-center" >
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <form onSubmit={findTrack}>
        <div className="form-group ">
        <input
      type="search"
      className="
      text-center
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleSearch"
      placeholder="Type song name"

      onChange={onChange}
      />
         
        </div>
    
        <Button fullWidth variant="contained" type="submit">
          Search
        </Button>
      </form>
      

      <div className="grid grid-cols-3 gap-4">
          {track_list && track_list.map(item => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
    </div>
  );
};

export default LyricsFinder;