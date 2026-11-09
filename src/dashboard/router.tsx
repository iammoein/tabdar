import { createBrowserRouter } from "react-router";
import Dashboard from "@/dashboard/Dashboard";
import Home from "@/dashboard/pages/Home";
import Collections from "@/dashboard/pages/Collections";
import Insight from "@/dashboard/pages/Insight";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/collections",
          element: <Collections />,
        },
        {
          path: "/insight",
          element: <Insight />,
        },
      ],
    },
  ],
  { basename: "/dashboard.html" },
);
