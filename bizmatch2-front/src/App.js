import React from "react";
import { AppProvider } from "./admin/features/users/userSlice";
import AdminRouterProvider from "./admin/routers/AdminRouters";

export default function App() {
  return (
    <AppProvider>
      <AdminRouterProvider />
    </AppProvider>
  );
}

