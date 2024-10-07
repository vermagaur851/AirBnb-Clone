import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="p-4 px-8 flex-col flex min-h-screen ">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
