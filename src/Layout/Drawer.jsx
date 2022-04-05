import { NavLink } from "react-router-dom";

export default function Drawer({ isOpen, setIsOpen, navigation }) {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    return (
        <>
            <div
                className={` fixed  h-full bg-slate-900 p-2  ease-in-out duration-300 ${isOpen ? "translate-x-0 " : "-translate-x-full"
                    }`}
            >
                <h3 className="mt-5 text-2xl text-white flex flex-col">
                    {navigation.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.to}
                            className={classNames(
                                item.current
                                    ? "underline underline-offset-4 decoration-blue-700 decoration-4 text-white"
                                    : "text-gray-300 hover:underline underline-offset-4 decoration-blue-700 decoration-4 hover:text-white",
                                "px-3 py-2 rounded-md text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </h3>
            </div>
        </>
    )
}