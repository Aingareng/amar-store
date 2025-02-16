import React from "react";
import Navbar from "../../shared/components/organisms/Navbar";

interface IProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="p-9">{children}</main>
    </>
  );
}
