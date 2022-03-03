import React from "react";

const Input = React.forwardRef(
  (
    {
      icon = undefined,
      hasError = false,
      error = undefined,
      label,
      className = undefined,
      ...others
    },
    ref
  ) => {
    const defaultClassNames = `w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600`;
    return (
      <div className="flex flex-col w-full relative">
        {label && (
          <label
            htmlFor={others?.id}
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        )}
        <div className={`${icon && "relative"}`}>
          {icon && (
            <span className="absolute inline-flex items-center h-full px-3 text-sm text-gray-500 border border-gray-300 border-r-1 rounded-l-md bg-gray-50">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`${defaultClassNames} form-input ${
              others.icon ? "pl-20" : icon ? "ps-8" : ""
            } w-full  ${className} ${
              others?.disabled && "bg-gray-200 opacity-70 cursor-not-allowed"
            }`}
            {...others}
          />
        </div>
        {hasError && (
          <span className={`text-sm text-red-500 'text-red-600'}`}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
export default Input;
