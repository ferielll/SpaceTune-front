import React from "react";
import Avatar from "react-avatar";

export const UserAvatar = ({
  user = undefined,
  size = 30,
  rounded = false,
  className,
}) => {
  const round = !rounded ? Math.round(size / 4) : size;
  return (
    <Avatar
      src={user.avatar ? user.avatar : undefined}
      name={user.userName}
      size={`${size}px`}
      round={`${round}px`}
      className={`object-cover cursor-pointer ${className}`}
    />
  );
};
