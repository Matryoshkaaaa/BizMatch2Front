import React from "react";
import { AdminProvider } from "./admin/features/users/userSlice";
import { AppProvider } from "./stores/ToolkitStrore";
import AppRouterProvider from "./routers/AppRouters";

export default function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <AppRouterProvider />
      </AdminProvider>
    </AppProvider>
  );
}
