import React, { useState } from "react";
import LightBox from "../../../../components/LightBox";
import useLightBox from "../../../../hooks/useLightBox";
import Music from "../../../../assets/music.png";
import { useQuery } from "react-query";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../../components/Breadcrum";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";
import { useLoading } from "../../../../hooks/useLoading";
import { TrashIcon } from "@heroicons/react/outline";

export default function DetailTracks() {
  const lightBox = useLightBox();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const path = location.pathname.split("/")[4];
  console.log("location", location.pathname.split("/")[4]);
  const images = Music;
  //Fetch details tracks
  const {
    data: tracks,
    isLoading,
    refetch,
  } = useQuery(["fetchDetailsTracks"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/track/getTrackById/${path}`)
      .then((res) => res.data)
  );
  console.log("track", tracks);
  const {
    isLoading: isDeletingLoading,
    startLoading,
    stopLoading,
  } = useLoading(false);
  const navigate = useNavigate();
  async function deleteTrack(selectedItem) {
    startLoading();
    await axios.delete(
      `http://localhost:3000/spacetune/api/track/deleteTrackById/${selectedItem._id}`
    );
    stopLoading();
    setShowDeleteModal(false);
    setSelectedItem(null);
    navigate("/app/entertainement/myTracks");
  }
  return (
    <div className="flex h-full">
      <div className="w-1/2">
        <div className="w-3/5 mx-12">
        {showDeleteModal && (
          <ConfirmModal
            title={`Are you sure to delete lesson "${selectedItem.name}" ?`}
            confirmButton="Delete"
            cancelButton="Cancel"
            onClickCancel={() => setShowDeleteModal(false)}
            onClickConfirm={() => deleteTrack(selectedItem)}
          />
        )}
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
            alt={"Music"}
            className="object-cover"
          />
          <h3 className="text-2xl mb-3 lg:text-3xl font-bold sm:text-4xl">
            {tracks?.name}
          </h3>
          <audio controls src={`http://localhost:3000/${tracks?.song}`}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <button
            className="bg-gray-100 text-gray-700  group flex rounded-md items-center w-full px-2 py-2 text-sm"
            onClick={() => {
              setShowDeleteModal(true);
              setSelectedItem(tracks);
            }}
          >
            <TrashIcon
              className={`w-5 h-5 mr-2 text-red-500`}
              aria-hidden="true"
            />
            Delete
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-red-400"></div>
    </div>
  );
}
