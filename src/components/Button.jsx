import React from "react";

export const Button = React.forwardRef(
  (
    {
      icon = undefined,
      loading = Boolean,
      disabled = false,
      title = "",
      mode = "primary" || "secondary",
      className = undefined,
    },
    ref
  ) => {
    return (
      <div>
        <button
          type="submit"
          className="inline-flex items-center justify-center py-2 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-700 hover:bg-blue-600 focus:shadow-outline focus:outline-none"
        >
          Subscribe
        </button>
        <button
          ref={ref}
          disabled={disabled}
          mode={mode}
          className={`${
            mode === "primary"
              ? "bg-blue-600 hover:bg-blue-800"
              : "bg-indigo-50 hover:bg-gray-400"
          }text-white font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          <span className="mr-2"> {icon && icon}</span>
          <span>{title}</span>
        </button>
      </div>
    );
  }
);
