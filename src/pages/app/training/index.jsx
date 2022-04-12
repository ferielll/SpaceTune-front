import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DetailsMyLessons from "./DetailsMyLessons.";
import DetailsTraining from "./DetailsTraining";
import ListTraining from "./ListTraining";
import MyTrainings from "./MyTrainings";
import Calendar from "./DashboardCalendar";
import Courses from "./Courses";
import Drawer from "../../../Layout/Drawer";
import Breadcrumb from "../../../components/Breadcrum";
const Training = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListTraining />}></Route>
        <Route path="/:id" element={<DetailsTraining />}></Route>
        <Route path="/dashboardLessons" element={<MyTrainings />}></Route>
        <Route
          path="dashboardLessons/details/:id"
          element={<DetailsMyLessons />}
        ></Route>
        <Route path="/dashboardLessons/calendar" element={<Calendar />}></Route>
        <Route path="/dashboardLessons/courses" element={<Courses />}></Route>
      </Routes>
    </div>
  );
};

export default Training;
