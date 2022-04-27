import Music from "../../../assets/music.png";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";
import { Link } from "react-router-dom";
import { HeartIcon as Dislike } from "@heroicons/react/outline";
import { HeartIcon as Like } from "@heroicons/react/solid";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import axios from "axios";

export default function Track({ track }) {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(track.likes.includes(user._id));
  const lightBox = useLightBox();
  console.log(track,'track')
  const images = Music;
  const onClick = (id) => {
    axios.put(`http://localhost:3000/spacetune/api/track/like/${id}`,{id:user._id});
    setIsLiked(!isLiked);
  };
  
  return (
    <div className="max-w-md w-full mx-auto mt-3 shadow-lg border-black rounded-md duration-300 hover:shadow-sm hover:-translate-y-2">
      <div className="postInfo">
        {lightBox.isLightBoxOpen && images && (
          <LightBox
            images={images}
            {...lightBox}
            closePortal={lightBox.close}
          />
        )}
        <img
          onClick={lightBox.open}
          src={images}
          loading="lazy"
          alt={"Music"}
          className="w-full cursor-pointer"
        />
        <div className="flex items-center space-x-2 p-2">
          <Link to={`/app/entertainement/track/${track._id}`} className="link">
            <h1 className="font-semibold text-base">{track.name}</h1>
          </Link>
          <span>
            {isLiked ? (
              <Like
                className="h-5 w-5 text-red-700 cursor-pointer"
                onClick={() => onClick(track._id)}
              />
            ) : (
              <Dislike
                className="h-5 w-5 text-red-700 cursor-pointer"
                onClick={() => onClick(track._id)}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
