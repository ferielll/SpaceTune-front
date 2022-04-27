import React from "react";
import routes from "../../routes/sidebar";
import { NavLink } from "react-router-dom";
import * as Icons from "../../icons";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <h1 className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        SpaceTune
      </h1>
      <ul className="mt-6">
        {routes.map((route, i) => (
          <li key={i} className="relative px-6 py-3">
            <NavLink
              
              to={route.path}
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarContent;
