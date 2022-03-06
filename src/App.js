import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import FallBackSuspense from "./components/FallBackSuspense";

import { useAuth } from "./hooks/useAuth";

const Login = lazy(() => import("./pages/authentification/Login"));
const Register = lazy(() => import("./pages/authentification/Register"));
const Application = lazy(() => import("./pages/app"));

function App() {
  //custom hook to check if user is logged In
  const { isLoggedIn, setLoggedIn } = useAuth();
  console.log(isLoggedIn, "islogeedin");
  return (
    <div className="App">
      <Suspense fallback={<FallBackSuspense />}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                isLoggedIn === false ? (
                  <Login setLoggedIn={setLoggedIn} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/app" element={<Application auth={isLoggedIn} />} />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/app" : "/login"} />}
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
