import {createHashRouter } from "react-router";

import Dashboard from "@/dashboard/Dashboard";
import Collections from "@/dashboard/pages/Collections";
import Home from "@/dashboard/pages/Home";
import Insight from "@/dashboard/pages/Insight";

export const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "insight",
        element: <Insight />,
      },
    ],
  },
]);
