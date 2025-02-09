import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaFile, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { SalesAnalyst } from "../../Context";

const InvoiceForm = () => {
  const { loca } = useContext(SalesAnalyst);
  const locationData = useLocation().state;
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    date: "",
    customer_name: "",
    items: [{ name: "", quantity: 1, price: 0 }],
    due_amount: "",
  });

  useEffect(() => {
    if (locationData) {
      setInvoice(locationData.data);
    }
  }, [locationData]);

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
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

  const payload = (inv) => {
    const parsedItem = [];
    inv.items.map((item) => {
      item.price = Number(item.price);
      item.quantity = Number(item.quantity);
      parsedItem.push(item);
    });
    return {
      invId: invoice.invoice_id ? invoice.invoice_id : null,
      customer_name: invoice.customer_name,
      items: parsedItem,
      due_amount: Number(invoice.due_amount),
    };
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let priceZero = invoice.items.filter((itm) => itm.price === 0);
    if (priceZero.length === 0) {
      axios
        .post(`${loca}/billing/save`, payload(invoice), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          if (data.success) {
            invoice.data = data.bill;
            invoice.id = data._id;
            navigate(`/view-invoice`, {
              state: {
                data: data.bill,
              },
            });
          }
        })
        .catch((Err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  const handleUpdate = (e) => {
    setLoading(true);
    e.preventDefault();
    let priceZero = invoice.items.filter((itm) => itm.price === 0);
    if (priceZero.length === 0) {
      axios
        .post(`${loca}/billing/update`, payload(invoice), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          let data = res.data;
          console.log(data);

          if (data.success) {
            invoice.data = data.bill;
            invoice.id = data._id;
            navigate(`/view-invoice`, {
              state: {
                data: data.bill,
              },
            });
          }
        })
        .catch((Err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-0 ">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 relative">
        {loading && (
          <div className="bg-gray-100 absolute h-full w-full z-50 opacity-80 left-0 top-0 flex items-center justify-center  cursor-wait">
            <h3 className="opacity-100 text-black text-2xl">Loading...</h3>
          </div>
        )}
        <form
          onSubmit={(e) => {
            if (locationData) handleUpdate(e);
            else handleSubmit(e);
          }}
          onReset={() => {
            setInvoice({
              date: "",
              customer_name: "",
              items: [{ name: "", quantity: 1, price: 0 }],
              due_amount: "",
            });
          }}
        >
          {/* Buyer Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div>
              <label className="block text-gray-700 font-semibold">
                Customer Name
              </label>
              <input
                type="text"
                name="customer_name"
                value={invoice.customer_name}
                onChange={handleInvoiceChange}
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
                className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 bg-slate-100 p-2 border rounded-xl"
              >
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Item Name
                  </label>
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
                  <label className="block text-gray-700 font-semibold">
                    Quantity
                  </label>
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
                  <label className="block text-gray-700 font-semibold">
                    Price
                  </label>
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
                  className="text-red-500 mt-1 text-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="text-blue-500 underline text-lg"
            >
              Add Item
            </button>
          </div>

          {/* Due Amount Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Due Amount</h2>
            <div>
              <label className="block text-gray-700 font-semibold">
                Total Dues
              </label>
              <input
                type="text"
                name="due_amount"
                value={invoice.due_amount}
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
            {locationData ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-x-2 items-center"
              >
                <span>Update Bill</span>
                <FaFile />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex gap-x-2 items-center"
              >
                <span>Create Bill</span>
                <FaFile />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
