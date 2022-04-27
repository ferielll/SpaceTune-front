import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SidebarProvider } from "./pages/dashboard/context/SidebarContext";
import { Windmill } from "@windmill/react-ui";

ReactDOM.render(
  <React.StrictMode>
    <SidebarProvider>
      <Windmill usePreferences>
        <App />
      </Windmill>
    </SidebarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
