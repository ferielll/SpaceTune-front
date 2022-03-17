export default function Breadcrumb({ title }) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-full mx-auto py-2 px-2 sm:px-6 lg:px-4">
        <h3 className="text-base font-medium text-gray-700">
          {title && title}
        </h3>
      </div>
    </div>
  );
}
