import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsMyLessons from "./DetailsMyLessons.";
import MyTrainings from "./MyTrainings";
import Courses from "./Courses";
import VideoCall from "./VideoCall";
import Messenger from "./Messenger/Messenger";
import ViewStats from "./Survey/Statistics/ViewStats";
import DisplaySurveys from "./Survey/preview";
const MyLessons = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MyTrainings />}></Route>
        <Route path="/preview" element={<DisplaySurveys />}></Route>
        <Route path="/details/:id" element={<DetailsMyLessons />}></Route>
        <Route path="/details/:id/courses" element={<Courses />}></Route>
        <Route path="/details/:id/messenger" element={<Messenger />}></Route>
        <Route path="/details/:id/videoCall" element={<VideoCall />}></Route>
        <Route
          path="/details/:id/courses/viewStat/:idSurvey"
          element={<ViewStats />}
        ></Route>
      </Routes>
    </div>
  );
};

export default MyLessons;
