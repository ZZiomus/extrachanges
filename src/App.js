import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Web3ContextProvider } from "./context";
import HooksWrapper from "./hooksWrapper";
import Download from "./views/download";
import Error404Page from "./views/error404Page";
import RefferalHome from "./views/refferalHome";
import JoinReferral from "./views/join.referral";
import ReferralDashbaord from "./views/referralDashbaord";

const router = createBrowserRouter([
  {
    path: "/referral",
    element: <RefferalHome />,
  },
  {
    path: "/referral/home/:wallet",
    element: <ReferralDashbaord />,
  },
  {
    path: "/referral/:code",
    element: <JoinReferral />,
  },

  {
    path: "referral/admin/hpx-system/download/wallets",
    element: <Download />,
  },

  {
    path: "/*",
    element: <Error404Page />,
  },
]);

export default function App() {
  return (
    <Web3ContextProvider>
      <HooksWrapper />
      <RouterProvider router={router} />
    </Web3ContextProvider>
  );
}
