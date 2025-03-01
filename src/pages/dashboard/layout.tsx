import React from "react";
import Navbar from "../../shared/components/organisms/Navbar";
import { Outlet } from "react-router-dom";

// interface IProps {
//   children: React.ReactNode;
// }
export default function DashboardLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="p-9">
        <Outlet />
      </main>
    </>
  );
}
