import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsTraining from "./DetailsTraining";
import ListTraining from "./ListTraining";
import Answer from "../MyLessons/Survey/Answer";
import Survey from "../MyLessons/Survey/index";
const Training = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListTraining />}></Route>
        <Route path="/:id" element={<DetailsTraining />}></Route>
        <Route path="/survey" element={<Survey />}></Route>
        <Route path="/:id/answer/:idPreview" element={<Answer />}></Route>
      </Routes>
    </div>
  );
};

export default Training;
