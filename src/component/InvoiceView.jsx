import React, { useEffect, useState } from "react";
import { FaArrowDown, FaPen } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function InvoiceView() {
  const { data } = useLocation().state;
  const [invoiceData, setInvoiceData] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [dues, setDues] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const calculateTotal = (dataInv) => {
    const subTotal = dataInv.items.reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.price),
      0
    );
    const dues = Number(dataInv.dueAmount);
    const total = subTotal + dues;
    return { subTotal, dues, total };
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      const { subTotal, dues, total } = calculateTotal(data);
      setSubTotal(subTotal);
      setDues(dues);
      setTotal(total);
      setInvoiceData(data);
    }
  }, [data]);

  const downloadInvoice = () => {
    invoiceData.subTotal = subTotal;
    invoiceData.dues = dues;
    invoiceData.total = total;
    navigate("/invoice", {
      state: {
        data: invoiceData,
        fileName: invoiceData.buyer.name,
      },
    });
  };

  if (invoiceData) {
    return (
      <div className="min-h-screen bg-gray-100 p-3">
        <div className="mx-auto bg-white shadow-md rounded-lg p-8 sm:p-4">
          <h1 className="text-3xl sm:text-xl font-bold mb-5">
            Arbina Tailor Bill
          </h1>

          {/* Invoice Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl sm:text-lg font-semibold">Date: </h2>
              <p className="text-gray-600">
                {invoiceData.date.toLocaleString("en-IN", {
                  year: "numeric", // e.g., 2024
                  month: "long", // e.g., October
                  day: "numeric", // 12-hour format with AM/PM
                })}
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-xl sm:text-lg font-semibold">Customer Name: </h2>
              <p>{invoiceData.buyer.name}</p>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Sr.no</th>
                  <th className="py-2 px-4 text-left">Item</th>
                  <th className="py-2 text-center">Quantity</th>
                  <th className="py-2 px-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 px-4 text-right">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Totals */}
          <div className="flex justify-end p-4">
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Subtotal:</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Due Amount:</span>
                <span>₹{dues}</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-x-2 items-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md flex gap-x-2 items-center"
            onClick={() => {
              navigate("/", {
                state: {
                  data: invoiceData,
                },
              });
            }}
          >
            <span>Edit</span>
            <FaPen />
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-x-2 items-center"
            onClick={() => {
              downloadInvoice();
            }}
          >
            <span>

            Download
            </span>
            <FaArrowDown/>
          </button>
        </div>
      </div>
    );
  }
}
