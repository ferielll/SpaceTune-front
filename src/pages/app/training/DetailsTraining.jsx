import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrum";
import capture from "../../../assets/capture.png";
import { useLoading } from "../../../hooks/useLoading";
import { toaster } from "evergreen-ui";
import { useUser } from "../../../hooks/useUser";
import { Button, Tabs } from "antd";
import DisplaySurveys from "../MyLessons/Survey/preview";
import { TabPane } from "react-bootstrap";
import Title from "../../../components/Title";

const DetailsTraining = () => {
  //réperer id in param
  const { id } = useParams();
  //helpers
  const { user } = useUser();
  const {
    isLoading: subscribeLoading,
    startLoading: startLoadingSubscribe,
    stopLoading: stopLoadingSubscribe,
  } = useLoading(false);
  //Fetch details training
  const {
    data: training,
    isLoading,
    refetch,
  } = useQuery(["fetchDetailsTraining"], () =>
    axios
      .get(`http://localhost:3000/spacetune/api/formation/findOne/${id}`)
      .then((res) => res.data)
  );

  async function subscribe(id) {
    startLoadingSubscribe();
    await axios({
      method: "put",
      url: `http://localhost:3000/spacetune/api/formation/subscribe/${id}`,
      data: { _id: user._id },
    });
    stopLoadingSubscribe();
    refetch();
  }

  return (
    <div>
      <Breadcrumb title="Training > Details training" />
      <div className="px-2 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
        {!isLoading && (
          <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
            <div className="relative lg:w-1/2">
              <img
                src={
                  training.image[0].imageURL
                    ? training.image[0].imageURL
                    : capture
                }
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
            <div className="flex flex-col justify-center p-4 bg-white lg:p-8 lg:pl-10 lg:w-1/2">
              <div>
                <p className="bg-green-300 inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Guitar
                </p>
              </div>
              <h3 className="text-2xl mb-3 lg:text-3xl font-bold leading-tightsm:text-4xl">
                {training.name}
              </h3>
              <p className="mb-5 text-gray-600">{training.description}</p>
              <div className="flex items-center">
                <Button
                  className={`${
                    training.users.includes(user._id) &&
                    "opacity-50 cursor-not-allowed"
                  } inline-flex justify-center text-white text-sm leading-6 font-medium py-1 px-4 mr-4 rounded-lg  tracking-wide transition-duration-200
                           shadow-md bg-indigo-600 focus:shadow-outline focus:outline-none
                         `}
                  disabled={training.users.includes(user._id)}
                  onClick={() => subscribe(training._id)}
                  loading={subscribeLoading}
                >
                  {training.users.includes(user._id)
                    ? "subscribed"
                    : "subscribe"}
                </Button>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                  Learn More
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
        <Tabs defaultActiveKey="1">
          <TabPane tab={<Title title="Courses" />} key="1">
            {/* {training?.images && <DisplaySurveys survey={training.courses} />} */}
          </TabPane>
          <TabPane tab={<Title title="Quizzes" />} key="2">
            {training?.courses && <DisplaySurveys survey={training.courses} />}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailsTraining;
