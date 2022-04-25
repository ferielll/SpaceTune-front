import Music from "../../../assets/music.png";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";
import { useState } from "react";
import axios from "axios";
import { useLoading } from "../../../hooks/useLoading";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function Track({ track }) {
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  const location = useLocation();
  //select item to delete
  const [selectedItem, setSelectedItem] = useState(null);
  const path = location.pathname.split("/entertainement")[2];
//   console.log('trackid',location.pathname.split("/"));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const images = Music;
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

        <hr />
        {showDeleteModal && (
          <ConfirmModal
            title={`Are you sure to delete lesson "${selectedItem.name}" ?`}
            confirmButton="Delete"
            cancelButton="Cancel"
            onClickCancel={() => setShowDeleteModal(false)}
            onClickConfirm={() => deleteTrack(selectedItem)}
          />
        )}
        <div className="pt-2 ml-4 mr-2 mb-3 cursor-pointer">
        <Link to={`/app/entertainement/track/${track._id}`} className="link">
          <p className="text-gray-500 text-sm mt-1 line-clamp-3">
            {track.name}
          </p>
          </Link>
          <audio
        controls
        src={`http://localhost:3000/${track.song}`}>
            Your browser does not support the
            <code>audio</code> element.
    </audio>
    <button
            className="bg-gray-100 text-gray-700  group flex rounded-md items-center w-full px-2 py-2 text-sm"
            onClick={() => {
              setShowDeleteModal(true);
              setSelectedItem(track);
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
    </div>
  );
}
