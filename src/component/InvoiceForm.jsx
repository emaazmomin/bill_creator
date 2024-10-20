import React, { useEffect, useState } from "react";
import { FaFile, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const InvoiceForm = () => {
  const { data } = useLocation().state;
  const [invoice, setInvoice] = useState({
    date: "",
    buyer: {
      name: "",
      address: "",
    },
    items: [{ name: "", quantity: 1, price: 0 }],
    dueAmount: "",
  });

  useEffect(() => {
    if (data) {
      setInvoice(data);
    }
  }, [data]);

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({
      ...prevState,
      buyer: {
        ...prevState.buyer,
        [name]: value,
      },
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    items[index][name] = value;
    setInvoice((prevState) => ({
      ...prevState,
      items,
    }));
  };

  // Add a new item row
  const addItem = () => {
    setInvoice((prevState) => ({
      ...prevState,
      items: [...prevState.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  // Remove an item row
  const removeItem = (index) => {
    const items = invoice.items.filter((_, i) => i !== index);
    setInvoice((prevState) => ({
      ...prevState,
      items,
    }));
  };

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    invoice.date = new Date();
    navigate(`/view-invoice`, {
      state: {
        data: invoice,
      },
    });
    // Here you would send the form data to your backend to generate a PDF
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form
          onSubmit={handleSubmit}
          onReset={() => {
            setInvoice({
              date: "",
              buyer: {
                name: "",
                address: "",
              },
              items: [{ name: "", quantity: 1, price: 0 }],
              dueAmount: "",
            });
          }}
        >
          {/* Buyer Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div>
              <label className="block text-gray-700">Customer Name</label>
              <input
                type="text"
                name="name"
                value={invoice.buyer.name}
                onChange={handleBuyerChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Item List */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {invoice.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
              >
                <div>
                  <label className="block text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    // step="0.01"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    // step="0.01"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="text-blue-500 underline"
            >
              Add Item
            </button>
          </div>

          {/* Due Amount Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Due Amount</h2>
            <div>
              <label className="block text-gray-700">Total Dues</label>
              <input
                type="text"
                name="dueAmount"
                value={invoice.dueAmount}
                onChange={handleInvoiceChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-center gap-x-2">
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <span>Clear Data</span>
              <FaTrash />
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-x-2 items-center"
            >
              <span>Create Bill</span>
              <FaFile />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
