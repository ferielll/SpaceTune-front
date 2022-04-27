import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./style.css"
const Track = props => {
    const navigate=useNavigate()
  const { track } = props;

  return (
    <div className="col-md-6 track mt-5">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              <i className="fas fa-play" /> Track
            </strong>
            : {track.track_name}
            <br />
            <strong>
              <i className="fas fa-compact-disc" /> Album
            </strong>
            : {track.album_name}
          </p>
          <div
            onClick={(e)=>{navigate("/app/tools/lyrics",{ state: {id:track.track_id} })}}
            className="btn btn-dark btn-block"
          >
            <i className="fas fa-chevron-right" /> View Lyrics
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;