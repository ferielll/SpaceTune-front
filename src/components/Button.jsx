import React from "react";

export const Button = React.forwardRef(
  (
    {
      icon = undefined,
      loading = Boolean,
      disabled = false,
      title = "",
      type = "primary" || "secondary",
      className = undefined,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${
          type === "primary" ? "bg-btn-primary" : "bg-gray-seconday "
        }${className}`}
        disabled={disabled || loading}
      >
        {icon || loading ? (
          <span className="flex items-center">
            {loading ? (
              <span className="w-5 h-5 mr-2 ease-linear border-2 border-t-2 border-gray-300 rounded-full -ms-1 loader" />
            ) : (
              icon
            )}
            {title && (
              <span className={`${loading ? "ps-2" : `-me-1 ms-2`} flex-1`}>
                {title}
              </span>
            )}
          </span>
        ) : (
          title
        )}
      </button>
    );
  }
);
