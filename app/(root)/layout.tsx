import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;
