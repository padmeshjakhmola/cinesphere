import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>;
};

export default Layout;
