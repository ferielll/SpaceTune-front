import axios from "axios";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import { UserAvatar } from "../../../components/UserAvatar";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";
import capture from "../../../assets/capture.png";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { Fragment } from "react";
import { useLoading } from "../../../hooks/useLoading";
import { Button } from "antd";

function ListTraining() {
  //helpers
  const { user } = useUser();
  const navigate = useNavigate();
  //loading subscribe
  const {
    isLoading: subscribeLoading,
    startLoading: startLoadingSubscribe,
    stopLoading: stopLoadingSubscribe,
  } = useLoading(false);
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  //Fetch List Trainings
  //states
  const [search, setSearch] = useState("");
  let filters = {};
  const textToSearch = search.trim();
  if (textToSearch.length >= 1) {
    filters["$or"] = [
      { nom: { $regex: textToSearch, $options: "i" } },
      { description: { $regex: textToSearch, $options: "i" } },
    ];
  }

  const { data, isLoading, refetch } = useQuery(["fetchListTraining"], () =>
    axios
      .get(
        `http://localhost:3000/spacetune/api/formation/getAll?filters=${JSON.stringify(
          filters
        )}`
      )
      .then((res) => res.data)
  );

  const trainings = useMemo(() => {
    if (isLoading) return [];
    return data;
  }, [data]);
  console.log(trainings, "training");

  //Update training
  async function subscribe(_id) {
    startLoadingSubscribe();
    await axios({
      method: "put",
      url: `http://localhost:3000/spacetune/api/formation/subscribe/${_id}`,
      data: { _id: user._id },
    });
    stopLoadingSubscribe();
    refetch();
  }
  //testing image view
  const images = capture;
  return (
    <Fragment>
      <Breadcrumb title={"All trainings"} />
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-6  px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title
              title="Trainings"
              subtitle="Trainings that are loved by the community. Updated every hour."
            />
            <InputSearch onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {!isLoading ? (
              trainings.map((items, key) => (
                <div
                  className="max-w-md w-full mx-auto mt-3 shadow-lg border-black rounded-md duration-300 hover:shadow-sm"
                  key={key}
                >
                  {/* LightBox component, images can be [String] == group of images || String */}
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
                    alt={items.name}
                    className="w-full h-48 rounded-t-md cursor-pointer"
                  />
                  <div className="flex justify-between">
                    <div
                      className="flex items-center pt-2 ml-4 mr-2"
                      onClick={() => navigate(`${items._id}`)}
                    >
                      <div className="flex items-center w-10 h-10 rounded-full">
                        <UserAvatar
                          user={items.teacher}
                          rounded={true}
                          size={35}
                        />
                      </div>
                      <div className="ml-3">
                        <span className="block text-gray-900">
                          {items.teacher?.userName}
                        </span>
                        <span className="block text-gray-400 text-sm">
                          {dayjs(items.createdAt).format("MMM DD YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pt-2 ml-4 mr-2 mb-3"
                    onClick={() => navigate(`${items._id}`)}
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {items.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                      {items.description}
                    </p>
                  </div>
                  <div className="flex justify-start pt-2 ml-4 mr-2 mb-3">
                    <Button
                      type="primary"
                      className={`${
                        items.users.includes(user._id) && "bg-red-400"
                      } inline-flex items-center justify-center py-1 px-4 font-medium tracking-wide text-white transition duration-200 rounded-xl border border-gray-300
                           shadow-md bg-gray-500 hover:animate-bounce focus:shadow-outline focus:outline-none
                         `}
                      onClick={() => subscribe(items._id)}
                      loading={subscribeLoading}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <Loader size={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ListTraining;
