import React from "react";
import { AdminProvider } from "./admin/features/users/userSlice";
import { AppProvider } from "./stores/ToolkitStrore";
import AppRouterProvider from "./routers/AppRouters";

export default function App() {
  return (
    <AppProvider>
<<<<<<< HEAD
      <AppRouterProvider />
      {/* <PaginationTest /> */}
=======
      <AdminProvider>
        <AppRouterProvider />
      </AdminProvider>
>>>>>>> th
    </AppProvider>
  );
}
