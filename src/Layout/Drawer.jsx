import { NavLink } from "react-router-dom";

export default function Drawer({ isOpen, setIsOpen, navigation }) {
  return (
    <>
      <div
        className={` fixed  h-full bg-gray-200 p-2  ease-in-out duration-300 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <h3 className="mt-5 text-2xl  flex flex-col">
          {navigation.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="flex justify-start items-center p-2 space-x-3 rounded-md"
            >
              <span className={`${item.icon && "w-5 h-5"}`}>
                {item.icon && item.icon}
              </span>
              <span className="text-sm font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </h3>
      </div>
    </>
  );
}
