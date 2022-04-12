import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";
import Post from "../Post/Post";
import NewBlog from "../Posts/NewBlog";
import "./posts.css";

export default function ListPosts({posts}) {
   //states (modals visibles)
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [isModalVisible, setModalVisible] = useState(false);
   //select item to delete
   const [selectedItem, setSelectedItem] = useState(null);
   const { user } = useUser();
  const {
    isLoading: isDeletingLoading,
    startLoading,
    stopLoading,
  } = useLoading(false);
  const {
    data: trainings,
    isLoading,
    refetch,
  } = useQuery(["fetchMyLessons"], () =>
    axios
      .get(
        `http://localhost:3000/spacetune/api/post/getAll/${user._id}`
      )
      .then((res) => res.data)
  );
  async function deleteTraining(selectedItem) {
    startLoading();
    await axios.delete(
      `http://localhost:3000/spacetune/api/post/delete/${selectedItem._id}`
    );
    stopLoading();
    setShowDeleteModal(false);
    setSelectedItem(null);
    refetch();
  }
  return (
    <Fragment>
      <Breadcrumb title={"All posts"} />
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title
              title="Posts"
              subtitle="Posts that are loved by the community. Updated every hour."
            />
            <InputSearch />
            <button
                onClick={() => setModalVisible(true)}
                className={`text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide shadow-md bg-navbar-color text-gray-100`}
              >
                Add new blog
              </button>
              {isModalVisible && (
              < NewBlog
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                 refetch={refetch}
              />
            )}
          </div>
          <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((p) => (
              <Post post={p} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}


