import { ChatIcon } from "evergreen-ui";
import React from "react";
import { UserAvatar } from "../../../components/UserAvatar";
import { useUser } from "../../../hooks/useUser";

export default function ListParticipants({ participants, setShowChat }) {
  return (
    <div className="h-full">
      <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
        <div className="pt-6 pb-4 px-5 border-b border-gray-200">
          <h2 className="text-xl leading-snug font-bold">Participants</h2>
        </div>
        <div className="py-3 px-5">
          <button
            onClick={() => setShowChat(true)}
            className="flex text-xs space-x-4 font-semibold uppercase text-white p-2 mb-1 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600"
          >
            <span> Chat with your team </span>
            <ChatIcon className="w-2 h-2" />
          </button>
          <div className="divide-y divide-gray-200 ">
            {participants?.map((user, index) => (
              <div
                key={index}
                className="min-w-full w-64 text-left py-2 focus:outline-none focus-visible:bg-indigo-50 hover:bg-gray-100 cursor-pointer"
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
                    <div className="text-[13px]">
                      The video chat ended · 2hrs
                    </div>
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
