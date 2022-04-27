import { ThumbDown, ThumbUp } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { UserAvatar } from "../../../components/UserAvatar";
import { useUser } from "../../../hooks/useUser";
import ReplyComment from "./ReplyComment";

export const SingleComment = ({ comment }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id));
  const onClick = (id) => {
    axios.put(`http://localhost:3000/spacetune/api/comment/like/${id}`, {
      id: user._id,
    });
    setIsLiked(!isLiked);
  };
  return (
    <div className="border-b border-gray-100 mb-2 pb-4">
      <p>
        <UserAvatar user={comment.postowner} rounded size={30} />{" "}
        {comment?.postowner.userName}
        <span className="flex justify-end">
          {" "}
          on {moment(comment?.createdAt).format("MMM DD, YYYY")}
        </span>
      </p>
      <span className="flex justify-end">
        {isLiked ? (
          <ThumbUp
            className="h-2 w-2 text-red-700 cursor-pointer"
            onClick={() => onClick(comment._id)}
          />
        ) : (
          <ThumbDown
            className="h-3 w-3 text-red-700 cursor-pointer"
            onClick={() => onClick(comment._id)}
          />
        )}
      </span>
      <p className="whitespace-pre-line text-gray-600 w-full text-base">
        {comment?.comment}
      </p>
      <ReplyComment />
    </div>
  );
};
