import { SearchIcon } from "@heroicons/react/outline";

export default function Breadcrumb({ title, setIsOpen, isOpen }) {
  return (
    <div className="bg-white shadow ">
      <div className="max-w-full mx-auto py-2 px-2 sm:px-6 lg:px-4">
        {isOpen ? (
          <svg
            onClick={() => setIsOpen(!isOpen)}
            className="  z-30 flex items-center cursor-pointer right-10 top-6"
            fill="#000000"
            viewBox="0 0 100 80"
            width="20"
            height="20"
          >
            <rect width="10" height="100"></rect>
            <rect x="30" width="10" height="100"></rect>
            <rect x="60" width="10" height="100"></rect>
          </svg>
        ) : (
          <svg
            onClick={() => setIsOpen(!isOpen)}
            className="  z-30 flex items-center cursor-pointer right-10 top-6"
            fill="#000000"
            viewBox="0 0 100 80"
            width="20"
            height="20"
          >
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        )}
      </div>
      <div>
        <h3 className="text-base   font-medium text-gray-700">
          {title && title}
        </h3>
      </div>
    </div>
  );
}
