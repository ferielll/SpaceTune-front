import jwtDecode from "jwt-decode";

export function useUser() {
  const user = jwtDecode(localStorage.getItem("token"));
  return { user };
}
