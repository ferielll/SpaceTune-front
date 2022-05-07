import "./message.css";
import { format } from "timeago.js";
import { UserAvatar } from "../../../../../../components/UserAvatar";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop align">
        {message && (
          <UserAvatar
            size={40}
            className="messageImg"
            user={message.sender}
            rounded
          />
        )}
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
