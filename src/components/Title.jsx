import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-3xl text-gray-800 font-semibold">{title}</h1>
      <p className="mt-3 text-gray-500">{subtitle && subtitle}</p>
    </div>
  );
};

export default Title;
