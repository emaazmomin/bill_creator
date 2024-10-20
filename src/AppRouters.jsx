import React from "react";
import InvoiceForm from "./component/InvoiceForm";
import PurchaseInvoice from "./component/PurchaseInvoice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./component/Test";
import InvoiceView from "./component/InvoiceView";

export default function AppRouters() {
  const routers = createBrowserRouter([
    {
      path: "/",
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
  ]);
  return <RouterProvider router={routers} />;
}
