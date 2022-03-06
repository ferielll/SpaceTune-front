import { useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  return { isLoggedIn, setLoggedIn };
};
