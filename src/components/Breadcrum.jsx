/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import ConfirmModal from "./Modal/ConfirmModal";
import Loader from "./Loader";

export default function Breadcrumb(props) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-fullxl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900">
          {props.title ? props.title : "title"}
        </h1>
      </div>
    </div>
    // <main>
    //   <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    //     {/* Replace with your content */}
    //     <div className="px-4 py-6 sm:px-0">
    //       <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
    //     </div>
    //     {/* /End replace */}
    //   </div>
    // </main>
  );
}
