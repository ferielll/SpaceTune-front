import { lazy } from "react";


// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Cards = lazy(() => import("../pages/Cards"));
const Modals = lazy(() => import("../pages/Modals"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Trainings = lazy(() => import("../pages/Trainings"));
const Shop = lazy(() => import("../pages/Shop"));
const Order = lazy(() => import("../pages/Order"));
/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    element: Dashboard, // view rendered
  },
  {
    path: "/cards",
    element: Cards,
  },
  {
    path: "/trainings",
    element: Trainings,
  },
  {
    path: "/shops",
    element: Shop,
  },
  {
    path: "/orders",
    element: Order,
  },
  {
    path: "/modals",
    element: Modals,
  },
  {
    path: "/404",
    element: Page404,
  },
  {
    path: "/blank",
    element: Blank,
  },
];

export default routes;
