import React from "react";
import { NavLink } from "react-router-dom";

export const SideBar = ({ items }) => {
  return (
    <div className="flex flex-col fixed  p-3 w-40 h-screen bg-gray-200">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {items &&
              items.map((item, index) => (
                <li key={index} className="rounded-sm">
                  <NavLink
                    rel="noopener noreferrer"
                    to={item.to}
                    className="flex justify-start items-center p-2 space-x-3 rounded-md"
                  >
                    <span className="w-5 h-5  dark:text-coolGray-400">
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
