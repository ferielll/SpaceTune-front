import { SearchIcon } from "@heroicons/react/outline";

export default function Breadcrumb({ title }) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-full mx-auto py-2 px-2 sm:px-6 lg:px-4">
        <h3 className="text-lg font-semibold text-gray-600">
          {title ? title : "title"}
        </h3>
      </div>
    </div>
  );
}
