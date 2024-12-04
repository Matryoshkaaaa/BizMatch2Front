import React from "react";
import { AppProvider } from "./admin/features/users/userSlice";
import AppRouterProvider from "./routers/AppRouters";

export default function App() {
  return (
    <AppProvider>
      <AppRouterProvider />
      {/* <PaginationTest /> */}
    </AppProvider>
  );
}
