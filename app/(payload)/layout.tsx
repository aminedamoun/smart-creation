/* Payload admin layout — provides its own <html>/<body> via RootLayout. */
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={async (args) => {
      "use server";
      return handleServerFunctions({
        ...args,
        config,
        importMap,
      });
    }}
  >
    {children}
  </RootLayout>
);

export default Layout;
