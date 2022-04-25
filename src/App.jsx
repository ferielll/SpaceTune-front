import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import FallBackSuspense from "./components/FallBackSuspense";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth } from "./hooks/useAuth";
import { ContextProvider } from "./context/VideoCall_Context";

const Login = lazy(() => import("./pages/authentification/Login"));
const Register = lazy(() => import("./pages/authentification/Register"));
const Application = lazy(() => import("./pages/app"));
const AdminDashboard = lazy(() => import("./pages/dashboard/index"));
function App() {
  //custom hook to check if user is logged In
  const { isLoggedIn, setLoggedIn } = useAuth();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 300000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <div className="App">
          <Suspense fallback={<FallBackSuspense />}>
            <Router>
              <Routes>
                <Route path="/dashboard/*" element={<AdminDashboard />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/login"
                  element={
                    !isLoggedIn ? (
                      <Login setLoggedIn={setLoggedIn} />
                    ) : (
                      <Navigate to="/app" />
                    )
                  }
                />
                <Route path="/app/*" element={<Application />} />
                <Route
                  path="/*"
                  element={<Navigate to={isLoggedIn ? "/app" : "/login"} />}
                />
              </Routes>
            </Router>
          </Suspense>
        </div>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
