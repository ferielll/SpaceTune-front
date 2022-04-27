import axios from "axios";
import moment from "moment";
import React, { Fragment, useMemo, useState } from "react";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import { useLoading } from "../../../hooks/useLoading";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { EditIcon } from "evergreen-ui";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useLocation } from "react-router-dom";
import ReplyComment from "./ReplyComment";
import { UserAvatar } from "../../../components/UserAvatar";

export default function Comments({id}) {
  //states (modals visibles)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //select item to delete
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log(path)

  const { data, dataUpdatedAt, isLoading, refetch } = useQuery(
    ["fetchComments"],
    () =>
      axios
        .get(`http://localhost:3000/spacetune/api/comment/getPost/${path}`)
        .then((res) => res.data)
  );

  const comments = useMemo(() => {
    if (isLoading) return [];
    return data;
  }, [dataUpdatedAt]);
console.log(comments,'comments')
  const {
    isLoading: isDeletingLoading,
    startLoading,
    stopLoading,
  } = useLoading(false);



  return (
    <>
      {comments?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-2 pb-4">
              <p className="">
               <UserAvatar user={comment.postowner} rounded size={30} /> {comment.postowner.userName}
            <span className='flex justify-end'> on {moment(comment.createdAt).format("MMM DD, YYYY")}</span>
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full text-base">
                {parse(comment.comment)}
              </p>
              <ReplyComment  />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
