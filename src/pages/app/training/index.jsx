import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsMyLessons from "./DetailsMyLessons.";
import DetailsTraining from "./DetailsTraining";
import ListTraining from "./ListTraining";
import MyTrainings from "./MyTrainings";
import NewTraining from "./NewTraining";
const Training = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListTraining />}></Route>
        <Route path="/dashboardLessons" element={<MyTrainings />}></Route>
        <Route path="/add" element={<NewTraining />}></Route>
        <Route path="/:id" element={<DetailsTraining />}></Route>
        <Route
          path="dashboardLessons/details/:id"
          element={<DetailsMyLessons />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Training;
