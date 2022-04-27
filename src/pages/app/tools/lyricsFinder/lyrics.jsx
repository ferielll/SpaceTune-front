import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { Spinner } from "evergreen-ui";
import { Button } from "@mui/material";

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
const navigate=useNavigate()
    const location = useLocation();
 useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
            location.state.id
        }&apikey=977816c334068d2c128b3f32578cc04d`
      )
      .then(res => {
        let lyrics = res.data.message.body.lyrics;
        console.log("lyrics", lyrics);
        setLyrics({ lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${
            location.state.id
          }&apikey=977816c334068d2c128b3f32578cc04d`
        );
      })
      .then(res => {
          console.log("res",res)
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      .catch(err => console.log(err));
  }, [location.state.id]);
  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
 
    return (
      <>
      <div>
      <Button  variant="contained" type="submit" onClick={(e)=>navigate("/app/tools/lyricsgenerator")} >
         Go Back
        </Button>
      </div>
         
       
        <div className="card">
          <h5 className="text-center text-5xl text-blue-500">
            {track.track.track_name} by {track.track.artist_name}
          </h5>
          <div className="card-body">
            <p className="text-xl mt-10">{lyrics.lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3 text-center">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{" "}
            {track.track.primary_genres.music_genre_list.length === 0
              ? "NO GENRE AVAILABLE"
              : track.track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>:{" "}
            {track.track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="MM/DD/YYYY">
              {track.track.first_release_date}
            </Moment>
          </li>
        </ul>
      </>
    );
            }
};

export default Lyrics;