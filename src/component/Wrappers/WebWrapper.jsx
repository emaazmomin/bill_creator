import React from "react";
import { SalesAnalyst } from "../../Context";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

export default function WebWrapper() {
  const loca = "http://localhost:5000";

  return (
    <div>
      {" "}
      <SalesAnalyst.Provider
        value={{
          loca,
        }}
      >
        {/* <Navbar /> */}
        <Outlet />
      </SalesAnalyst.Provider>
    </div>
  );
}
