import React from "react";
import Spacetune from "../assets/spacetuneWidth.png";
import Spinner from "./Loader";

const FallBackSuspense = (props) => (
  <div className="flex flex-col items-center justify-center w-full h-screen space-y-2">
    <img src={Spacetune} className="w-48 h-48" alt="Spacetune logo" />
    <Spinner size={50} />
  </div>
);
export default FallBackSuspense;
