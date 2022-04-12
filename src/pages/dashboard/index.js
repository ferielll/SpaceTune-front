import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Main from "./containers/Main";
import ThemedSuspense from "./components/ThemedSuspense";
import { SidebarContext } from "./context/SidebarContext";
import Dashboard from "./pages/Dashboard";
import Training from "./pages/Trainings";
import Modals from "./pages/Modals";
import Cards from "./pages/Cards";

const Page404 = lazy(() => import("./pages/404"));

function AdminDashboard() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [closeSidebar, location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Routes>
              <Route path={`/`} element={<Dashboard />} />
              <Route path={`/training`} element={<Training />} />
              <Route path={`/modals`} element={<Modals />} />
              <Route path={`/cards`} element={<Cards />} />
              <Route component={Page404} />
            </Routes>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default AdminDashboard;
