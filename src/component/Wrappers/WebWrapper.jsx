import React from "react";
import { SalesAnalyst } from "../../Context";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { AppProperties } from "../../AppProperties";

export default function WebWrapper() {
  const loca = AppProperties.loca;

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
