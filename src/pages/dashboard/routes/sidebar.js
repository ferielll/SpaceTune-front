/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/dashboard/", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that dashboardear in Sidebar
  },
  {
    path: "/dashboard/training",
    icon: "PeopleIcon",
    name: "Training",
  },
  {
    path: "/dashboard/shop",
    icon: "CartIcon",
    name: "Shop",
  },
  {
    path: "/dashboard/order",
    icon: "CartIcon",
    name: "Order",
  },
  {
    path: "/dashboard/cards",
    icon: "CardsIcon",
    name: "Cards",
  },
  {
    path: "/dashboard/modals",
    icon: "ModalsIcon",
    name: "Modals",
  },
  {
    path: "/dashboard/blogs",
    icon: "ModalsIcon",
    name: "Blogs",
  },
];

export default routes;
