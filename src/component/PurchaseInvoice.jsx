import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from "react-router-dom";

const PurchaseInvoice = () => {
  const { data, fileName } = useLocation().state;
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    if (data) {
      setInvoiceData(data);
    }
  }, [data]);

  useEffect(() => {
    if (invoiceData && invoiceRef && invoiceRef.current) {
      generatePDF();
      setInvoiceData(null);
      navigate(-1);
    }
  }, [invoiceData, invoiceRef]);

  const generatePDF = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);

      const pageHeight = pdf.internal.pageSize.height;
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(`${fileName}-bill.pdf`);
    });
  };

  if (invoiceData) {
    return (
      <>
        <div className="min-h-screen bg-gray-100 p-3">
          <div
            ref={invoiceRef}
            style={{
              width: "496.8px",
              height: "fit-content",
            }}
            className="mx-auto bg-white shadow-md rounded-lg p-8 sm:p-4"
          >
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
                    <th className="py-2 px-4 text-left sm:text-sm">Sr.no</th>
                    <th className="py-2 px-4 text-left sm:text-sm">Item</th>
                    <th className="py-2 text-center sm:text-sm">Quantity</th>
                    <th className="py-2 px-4 text-right sm:text-sm">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 sm:text-sm">{index + 1}</td>
                      <td className="py-2 px-4 sm:text-sm">{item.name}</td>
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
                  <span className="font-semibold sm:text-sm">Subtotal:</span>
                  <span>₹{invoiceData.subTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold sm:text-sm">Due Amount:</span>
                  <span>₹{invoiceData.dues}</span>
                </div>
                <div className="flex justify-between font-bold text-xl sm:text-lg">
                  <span>Total:</span>
                  <span>₹{invoiceData.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={generatePDF}
            >
              Donwload
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default PurchaseInvoice;
