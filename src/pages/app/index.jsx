import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FallBackSuspense from "../../components/FallBackSuspense";
import NavBar from "../../Layout/NavBar";

const Training = lazy(() => import("./training/"));
const Tools = lazy(() => import("./tools"));
const Shop = lazy(() => import("./shop"));
const Entertainment = lazy(() => import("./entertainment"));
const Contact = lazy(() => import("./contact"));

export const Application = ({auth}) => {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<FallBackSuspense />}>
        <BrowserRouter>
          <Routes>
            <Route path="/tools" element={Tools}></Route>
            <Route path="/shop" element={Shop}></Route>
            <Route path="/entertainment" element={Entertainment}></Route>
            <Route path="/training" element={Training}></Route>
            <Route path="/contact" element={Contact}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};
