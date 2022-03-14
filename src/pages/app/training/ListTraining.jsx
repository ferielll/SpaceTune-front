import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import { UserAvatar } from "../../../components/UserAvatar";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";

function ListTraining() {
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  //exemple for test
  const images = "//placekitten.com/1500/500";
  //useQuery is function from react-query,  1 param key, second param func()
  //we use it for fetch (method get), create update delete we use useMutation instaed of this hook
  const {
    data: trainings,
    isError,
    isLoading,
  } = useQuery(["fetchListTraining"], () =>
    axios
      .get("http://localhost:3000/spacetune/api/formation/getAll")
      .then((res) => res.data)
  );

  return (
    <div>
      <Breadcrumb title={"Training > List of trainings"} />
      <div className="flex flex-row pt-1">
        <section className="mt-6 mx-auto px-2 max-w-screen-xl lg:px-4">
          <div className="flex justify-between text-start">
            <Title
              title="List of trainings"
              subtitle="Trainings that are loved by the community. Updated every hour."
            />
            <InputSearch />
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {!isLoading &&
              trainings.map((items, key) => (
                <div
                  className="max-w-md w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
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
                  <a href={items.href}>
                    <img
                      onClick={lightBox.open}
                      src={items.img}
                      loading="lazy"
                      alt={items.name}
                      className="w-full h-48 rounded-t-md"
                    />
                    <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                      <div className="flex-none w-10 h-10 rounded-full">
                        <UserAvatar
                          user={items.teacher}
                          rounded={true}
                          size={35}
                        />
                      </div>
                      <div className="ml-3">
                        <span className="block text-gray-900">
                          {items.teacher.userName}
                        </span>
                        <span className="block text-gray-400 text-sm">
                          {dayjs(items.createdAt).format("MMM DD YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 ml-4 mr-2 mb-3">
                      <h3 className="text-xl text-gray-900">{items.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {items.description}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListTraining;
