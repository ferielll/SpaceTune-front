import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-4xl text-gray-800 font-semibold">{title}</h2>
      <p className="mt-3 text-gray-500">{subtitle && subtitle}</p>
    </div>
  );
};

export default Title;
