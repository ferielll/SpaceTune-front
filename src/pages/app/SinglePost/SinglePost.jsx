import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SinglePost.css";
import Music from "../../../assets/music.png";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NavBar from "../../../Layout/NavBar";
import { useLoading } from "../../../hooks/useLoading";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { TrashIcon } from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import { useQuery } from "react-query";
import EditPost from "./EditPost";
import { EditIcon } from "evergreen-ui";
import moment from "moment";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log('trackid',location.pathname.split("/"));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();
  //fetch Single Posts
  const { data, isLoading, dataUpdatedAt, refetch } = useQuery(["fetchSinglePost"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/post/${path}`)
      .then((res) => res.data)
  );

  const post = useMemo(() => {
    if (isLoading) return {};
    return data;
  }, [dataUpdatedAt]);
console.log(post,'mmmm')
  const {
    isLoading: isDeletingLoading,
    startLoading,
    stopLoading,
  } = useLoading(false);

  async function deleteTraining() {
    startLoading();
    await axios.delete(
      `http://localhost:3000/spacetune/api/post/delete/${path}`
    );
    stopLoading();
    setShowDeleteModal(false);
    navigate("/app/blogs");
  }

 


  return (
    <div className="bg-gray-100 shadow-lg rounded-lg lg:p-8 pb-12 mb-8 ml-auto mr-auto">
      <button
        onClick={() => navigate("/app/blogs")}
        className={`text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide shadow-md bg-navbar-color text-gray-100`}
      >
        Back to menu
      </button>
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={Music}
          alt=""
          className="object-top h-full w-auto object-cover shadow-lg rounded-t-lg lg:rounded-lg ml-72 mb-20"
        />
      </div>
      <div className="singlePostWrapper">
        <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        </div>
        <span>
          <b>Author: {post.username}</b>
        </span>
        {showDeleteModal && (
          <ConfirmModal
            title={`Are you sure to delete lesson "${post.title}" ?`}
            confirmButton="Delete"
            cancelButton="Cancel"
            onClickCancel={() => setShowDeleteModal(false)}
            onClickConfirm={() => deleteTraining()}
          />
        )}
        {showEditModal && (
          <EditPost
            isModalVisible={showEditModal}
            setModalVisible={setShowEditModal}
            // refetch={refetch}
            item={selectedItem}
            onClickConfirm={() => navigate(`/post${post._id}`)}
          />
        )}
        <div className="singlePostEdit ml-56">
          <button
            className="bg-gray-100 text-gray-700  group flex rounded-md items-center w-full px-2 py-2 text-sm"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            <TrashIcon
              className={`w-5 h-5 mr-2 text-red-500`}
              aria-hidden="true"
            />
            Delete
          </button>

          <button
            className="bg-gray-100 text-gray-700 group flex rounded-md   items-center w-full px-2 py-2 text-sm"
            onClick={() => {
              setShowEditModal(true);
              setSelectedItem(post);
            }}
          >
            <>
              <EditIcon
                className={`w-5 h-5 mr-2 text-blue-500`}
                aria-hidden="true"
              />
              Edit
            </>
          </button>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="align-middle">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
        <p className="text-black-700 font-bold">{post.content}</p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setModalVisible(true)}
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-sm font-normal rounded-full text-white px-5 py-3 cursor-pointer"
          >
            Post Comment
          </button>
          {isModalVisible && (
            <CommentForm
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
              refetch={refetch}
            />
          )}
        </div>
        <div className="py-20">
        <Comments 
        id= {post && post._id}
        refetch={refetch}
        />
        </div>
      </div>
    </div>
  );
}
