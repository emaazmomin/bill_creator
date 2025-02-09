import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InvoiceForm from "./component/Billing/InvoiceForm";
import PurchaseInvoice from "./component/Billing/PurchaseInvoice";
import InvoiceView from "./component/Billing/InvoiceView";
import WebWrapper from "./component/Wrappers/WebWrapper";

export default function AppRouters() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <WebWrapper />,
      children: [
        {
          path: "/bill_creator",
          element: <InvoiceForm />,
        },
        {
          path: "/invoice",
          element: <PurchaseInvoice />,
        },
        {
          path: "/view-invoice",
          element: <InvoiceView />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routers} />;
}
