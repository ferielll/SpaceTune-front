import React from "react";
import LightBox from "../../../../components/LightBox";
import useLightBox from "../../../../hooks/useLightBox";
import Music from "../../../../assets/music.png";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";


export default function DetailTracks() {
  const lightBox = useLightBox();
  //réperer id in param
  const { id } = useParams();
  const images = Music;
  //Fetch details tracks
  const {
    data: tracks,
    isLoading,
    refetch,
  } = useQuery(["fetchDetailsTracks"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/track/getTrackById/${id}`)
      .then((res) => res.data)
  );
  return (
    <div className="px-2 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
      <div className="relative lg:w-1/2">
        {lightBox.isLightBoxOpen && images && (
          <LightBox
            images={images}
            {...lightBox}
            closePortal={lightBox.close}
          />
        )}
        <img
          onClick={LightBox.open}
          src={images}
          loading="lazy"
          alt={"Music"}
          className="object-cover w-full lg:absolute h-80 lg:h-full cursor-pointer"
        />
        <svg
          className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
          viewBox="0 0 20 104"
          fill="currentColor"
        >
          <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
        </svg>
      </div>
      
      <h3 className="text-2xl mb-3 lg:text-3xl font-bold leading-tightsm:text-4xl">
        {tracks.name}
      </h3>
    </div>
  );
}
