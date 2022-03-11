import { SearchIcon } from "@heroicons/react/outline";
import React from "react";

const InputSearch = ({onChange, className, placeholder}) => {
  return (
    <form>
      <div className="relative">
        <SearchIcon className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" />
        <input
          onChange={onChange}
          type="text"
          placeholder={placeholder ? placeholder : "Search"}
          className={`w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 ${className}`}
        />
      </div>
    </form>
  );
};

export default InputSearch;
