export default function Breadcrumb({ title, setIsOpen, isOpen }) {
  return (
    <div className="flex bg-white shadow ">
      <div className="max-w-full py-2 px-2 sm:px-6 lg:px-4">
        <h3 className="text-base font-medium text-gray-700 pl-12">
          {title && title}
        </h3>
      </div>
    </div>
  );
}
