import { ChatIcon } from "evergreen-ui";
import React from "react";
import { UserAvatar } from "../../../components/UserAvatar";

export default function ListParticipants({ participants, setShowChat }) {
  return (
    <div className="mx-auto">
      <div className="relative  bg-white shadow-md rounded-lg">
        <div className="pt-6 pb-4 px-5 border-b border-gray-200">
          <h2 className="text-xl leading-snug font-bold">Participants</h2>
        </div>
        <div className="py-3 px-5">
          <button
            onClick={() => setShowChat(true)}
            className="flex text-xs space-x-4 font-semibold uppercase text-white p-2 mb-1 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600  hover:scale-110 transition duration-300 ease-in-out"
          >
            <span> Chat with your team </span>
            <ChatIcon />
          </button>
          <div className="divide-y divide-gray-200 ">
            {participants?.map((user, index) => (
              <div
                key={index}
                className="min-w-full w-52 text-left py-2 focus:outline-none focus-visible:bg-indigo-50 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center">
                  <UserAvatar
                    user={user}
                    rounded
                    size={32}
                    className="rounded-full items-start flex-shrink-0 mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {user.userName}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
