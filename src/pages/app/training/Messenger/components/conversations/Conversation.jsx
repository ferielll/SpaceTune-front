import axios from "axios";
import { useEffect, useState } from "react";
import { UserAvatar } from "../../../../../../components/UserAvatar";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:3000/spacetune/api/chat/conversation/users/" +
            friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      {user && (
        <>
          <UserAvatar
            user={user}
            rounded
            size={32}
            className="rounded-full items-start flex-shrink-0 mr-3"
          />
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-gray-600">
                {user.userName}
              </span>
              <span className="block ml-2 text-sm text-gray-600">6 hour</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">
              Good Morning
            </span>
          </div>
        </>
      )}
    </div>
  );
}
