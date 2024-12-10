import React from "react";
import ReviewTable from "../components/ReviewTable";
import UserTable from "../components/UserTable";
import UserManagements from "../pages/UserManagements";
import MainLayout from "../ui/MainLayout";
import ProjectTable from "../components/ProjectTable";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const adminRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <UserManagements />,
      },
      {
        path: "members",
        element: <UserTable />,
      },
      {
        path: "reviews",
        element: <ReviewTable />,
      },
      {
        path: "projects",
        element: <ProjectTable />,
      },
    ],
  },
]);

export default function AdminRouterProvider() {
  return <RouterProvider router={adminRouter} />;
}
