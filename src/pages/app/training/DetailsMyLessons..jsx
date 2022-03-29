import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrum";
import capture from "../../../assets/capture.png";
import ListParticipants from "./ListParticipants";
const DetailsMyLessons = () => {
  //réperer id in param
  const { id } = useParams();
  //fetch details training
  const { data: training, isLoading } = useQuery(["fetchDetailsMylesson"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/formation/myLessonById/${id}`)
      .then((res) => res.data)
  );
  console.log(training);
  return (
    <div>
      <Breadcrumb title="Training > Details training" />
      <div
        className="
      px-2 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6"
      >
        {!isLoading && (
          <>
            <div className="flex flex-col h-full max-w-screen-lg bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
              <div className="relative lg:w-1/2">
                <img
                  src={capture}
                  alt=""
                  className="object-cover w-full lg:absolute h-80 lg:h-full"
                />
                <svg
                  className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
                  viewBox="0 0 20 104"
                  fill="currentColor"
                >
                  <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
                </svg>
              </div>
              <div className="flex flex-col justify-center p-4 bg-white lg:p-4 lg:pl-10 lg:w-1/2">
                <div>
                  <p className="bg-green-300 inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                    Guitar
                  </p>
                </div>
                <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
                  {training.name}
                </h5>
                <p className="mb-5 text-gray-800">{training.description}</p>
                <div>
                  <button
                    className={` text-white text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide transition-duration-200
                           shadow-md bg-blue-600 focus:shadow-outline focus:outline-none hover:-translate-y-1`}
                  >
                    Start live
                  </button>
                  <button
                    className={` text-gray-700 text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide transition-duration-200
                           shadow-md focus:shadow-outline focus:outline-none hover:-translate-y-1`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col max-w-screen-lg bg-white z-50 lg:flex-row sm:mx-auto mt-3">
              <ListParticipants participants={training.users} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsMyLessons;
