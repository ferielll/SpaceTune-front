import axios from "axios";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { SingleComment } from "./SingleComment";

export default function Comments({ id }) {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { data, dataUpdatedAt, isLoading } = useQuery(["fetchComments"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/comment/getPost/${path}`)
      .then((res) => res.data)
  );
  const comments = useMemo(() => {
    if (isLoading) return [];
    return data;
  }, [dataUpdatedAt]);




  return (
    <>
      {comments?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments?.length} Comments
          </h3>
          {comments.map((comment, i) => (
            <SingleComment key={i} comment={comment} />
          ))}
        </div>
      )}
    </>
  );
}
