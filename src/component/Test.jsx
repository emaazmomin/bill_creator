import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Test() {
  const invoiceRef = useRef();

  const generatePDF = () => {
    const input = invoiceRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("invoice.pdf");
    });
  };
  return (
    <div>
      <div
        ref={invoiceRef}
        style={{ padding: "20px", backgroundColor: "white" }}
      >
        <h1>Invoice</h1>
        <p>Customer Name: John Doe</p>
        <p>Amount: $100</p>
      </div>
      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
}
