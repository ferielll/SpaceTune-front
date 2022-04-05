import React from "react";
import { UserAvatar } from "../../../components/UserAvatar";
import { useUser } from "../../../hooks/useUser";

export default function ListParticipants({ participants }) {
  //helpers
  const { user } = useUser();
  return (
    <section className="flex flex-col justify-center text-gray-600 min-h-screen">
      <div className="h-full">
        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
          <div className="pt-6 pb-4 px-5 border-b border-gray-200">
            <h2 className="text-xl leading-snug font-bold">Participants</h2>
          </div>
          <div className="py-3 px-5">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
              Chats
            </h3>
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
    </section>
  );
}
