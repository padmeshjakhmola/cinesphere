import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
};

export default Layout;
