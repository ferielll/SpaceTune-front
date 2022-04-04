/* This example requires Tailwind CSS v2.0+ */
import { Fragment,useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import Spacetune from "../assets/spacetuneWidth.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { UserAvatar } from "../components/UserAvatar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cart from "../pages/app/shop"
import { Link } from 'react-router-dom'

const navigation = [
  {
    name: "Shop",
    to: "shop",
    current: false,
  },
 
  {
    name: "Blogs",
    to: "blogs",
    current: false,
  },
  {
    name: "Tools",
    to: "tools",
    current: false,
  },
  {
    name: "Entertainment",
    to: "entertainment",
    current: false,
  },
  {
    name: "Training",
    current: false,
    children: [
      {
        name: "List trainings",
        to: "training",
      },
      {
        name: "My lessons",
        to: "training/dashboardLessons",
      },
    ],
  },
  {
    name: "Contact",
    to: "contact",
    current: false,
  },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
 
  //helpers
  const navigate = useNavigate();
  const { user } = useUser();

  //user Menu
  const userNavigation = [
    { name: "Your Profile", to: "#" },
    { name: "Settings", to: "#" },
    {
      name: "Sign out",
      to: "/login",
      onClick: async () => {
        await localStorage.clear();
        await sessionStorage.clear();
        window.location.href = "/login";
      },
    },
  ];
  return (
    <div className="sticky top-0 left-0 right-0 z-50  w-full">
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-navbar-color">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        onClick={() => navigate("/")}
                        className="h-20 w-18 cursor-pointer"
                        src={Spacetune}
                        alt="Spacetune"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item, index) =>
                          item.children ? (
                            <Menu
                              key={index}
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button
                                  className={classNames(
                                    "text-gray-300 hover:underline underline-offset-4 decoration-blue-700 decoration-4 hover:text-white",
                                    "px-3 py-2 rounded-md text-base font-medium"
                                  )}
                                >
                                  {item.name}
                                </Menu.Button>
                              </div>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="flex justify-center absolute w-28 mt-1 bg-navbar-color divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black  focus:outline-none">
                                  <div className="px-1 py-1">
                                    {item.children.map((i) => (
                                      <Menu.Item key={i}>
                                        <NavLink
                                          key={i}
                                          to={i.to}
                                          className={
                                            "text-gray-200 flex rounded-md items-center w-full py-2 font-normal hover:text-white"
                                          }
                                        >
                                          {i.name}
                                        </NavLink>
                                      </Menu.Item>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          ) : (
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
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      
                      <NavLink
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        to = {"cart"}
                      >
                        <span className="sr-only">Cart</span>
                        <div className="cart">
                          <span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </NavLink>
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.avatar}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.to}
                                    onClick={() =>
                                      item.onClick() && item.onClick()
                                    }
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.to}
                      className={
                        ("text-gray-300 hover:bg-red-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium")
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <UserAvatar user={user} />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.userName}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        to={item.to}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
     
        
          
      
    </div>
    
  );
}
