import { CalendarIcon, HomeIcon } from "@heroicons/react/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  const title = "Trainings";
  const items = [
    {
      name: "Training",
      to: "#",
      icon: <HomeIcon />,
    },
    {
      name: "Courses & Quizs",
      to: "#",
      icon: <HomeIcon />,
    },
    {
      name: "Calendar",
      to: "#",
      icon: <CalendarIcon />,
    },
  ];
  return (
    <div className="flex flex-col fixed p-5 w-52 h-screen bg-gray-200">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {items &&
              items.map((item, index) => (
                <li key={index} className="rounded-sm">
                  <NavLink
                    rel="noopener noreferrer"
                    to={item.to}
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <span className="w-5 h-5  dark:text-coolGray-400">
                      {item.icon && item.icon}
                    </span>
                    <span className="font-semibold">{item.name}</span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-self-end w-full fixed bottom-3">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 rounded-lg dark:bg-coolGray-500"
        />
        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <NavLink
              rel="noopener noreferrer"
              to="#"
              className="text-xs hover:underline"
            >
              View profile
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};
