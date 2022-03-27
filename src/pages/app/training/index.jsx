import React from "react";
import { Route, Routes } from "react-router-dom";
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
      </Routes>
    </div>
  );
};

export default Training;
