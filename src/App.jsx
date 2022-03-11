import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import FallBackSuspense from "./components/FallBackSuspense";

import { useAuth } from "./hooks/useAuth";

const Login = lazy(() => import("./pages/authentification/Login"));
const Register = lazy(() => import("./pages/authentification/Register"));
const Application = lazy(() => import("./pages/app"));

function App() {
  //custom hook to check if user is logged In
  const { isLoggedIn, setLoggedIn } = useAuth();
  return (
    <div className="App">
      <Suspense fallback={<FallBackSuspense />}>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={
                isLoggedIn === false ? (
                  <Login setLoggedIn={setLoggedIn} />
                ) : (
                  <Navigate to="/app" />
                )
              }
            />
            <Route path="/app/*" element={<Application />} />
            <Route
              path="/"
              element={<Navigate to={isLoggedIn ? "/app" : "/login"} />}
            />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
