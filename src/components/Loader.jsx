import { Spinner } from "evergreen-ui";
import React from "react";

export default function Loader({ size }) {
  return <Spinner size={size || 32} />;
}
