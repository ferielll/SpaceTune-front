import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsMyLessons from "./DetailsMyLessons.";
import DetailsTraining from "./DetailsTraining";
import ListTraining from "./ListTraining";
import MyTrainings from "./MyTrainings";
import Calendar from "./DashboardCalendar";
import Courses from "./Courses";
import VideoCall from "./VideoCall";
import Messenger from "./Messenger/Messenger";
import Answer from "./Survey/Answer";
import ViewStats from "./Survey/Statistics/ViewStats";
import Survey from "./Survey";
import DisplaySurveys from "./Survey/preview";
const Training = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListTraining />}></Route>
        <Route path="/:id" element={<DetailsTraining />}></Route>
        <Route path="/dashboardLessons" element={<MyTrainings />}></Route>
        <Route path="/survey" element={<Survey />}></Route>
        <Route path="/answer/:idPreview" element={<Answer />}></Route>
        <Route
          path="/survey/viewStat/:idSurvey"
          element={<ViewStats />}
        ></Route>
        <Route path="/preview" element={<DisplaySurveys />}></Route>
        <Route
          path="dashboardLessons/details/:id"
          element={<DetailsMyLessons />}
        ></Route>
        <Route path="/dashboardLessons/calendar" element={<Calendar />}></Route>
        <Route path="/dashboardLessons/courses" element={<Courses />}></Route>
        <Route
          path="/dashboardLessons/messenger"
          element={<Messenger />}
        ></Route>
        <Route
          path="/dashboardLessons/videoCall"
          element={<VideoCall />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Training;
