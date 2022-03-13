import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import { UserAvatar } from "../../../components/UserAvatar";

function ListTraining() {
  const {
    data: trainings,
    isError,
    isLoading,
  } = useQuery(["fetchListTraining"], () =>
    axios
      .get("http://localhost:3000/spacetune/api/formation/getAll")
      .then((res) => res.data)
  );

  console.log(trainings, "trainings");
  return (
    <div>
      <Breadcrumb title={"Training > List of trainings"} />
      <div className="flex flex-row pt-1">
        <section className="mt-6 mx-auto px-2 max-w-screen-xl lg:px-4">
          <div className="flex justify-between text-start">
            <div>
              <h2 className="text-4xl text-gray-800 font-semibold">
                List of trainings
              </h2>
              <p className="mt-3 text-gray-500">
                Trainings that are loved by the community. Updated every hour.
              </p>
            </div>
            <InputSearch />
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {!isLoading &&
              trainings.map((items, key) => (
                <article
                  className="max-w-md w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                  key={key}
                >
                  <a href={items.href}>
                    <img
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
                </article>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ListTraining;
