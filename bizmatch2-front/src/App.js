import React from "react";
import PaginationTest from "./admin/components/pagenationApi/PaginationTest";
import { AppProvider } from "./admin/features/users/userSlice";
import AdminRouterProvider from "./admin/routers/AdminRouters";

export default function App() {
  return (
    <AppProvider>
      <PaginationTest />
      <AdminRouterProvider />
    </AppProvider>
  );
}

