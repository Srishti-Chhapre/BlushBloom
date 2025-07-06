import { useEffect, useState } from "react";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [sellerFilter, setSellerFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
    setFilteredOrders(storedOrders);
  }, []);

  useEffect(() => {
    let updatedOrders = [...orders];

    if (sellerFilter !== "All") {
      updatedOrders = updatedOrders.filter(
        (order) => order.sellerName === sellerFilter
      );
    }

    if (statusFilter !== "All") {
      updatedOrders = updatedOrders.filter((order) => order.status === statusFilter);
    }

    if (dateFilter !== "") {
      updatedOrders = updatedOrders.filter((order) => order.date === dateFilter);
    }

    setFilteredOrders(updatedOrders);
  }, [sellerFilter, statusFilter, dateFilter, orders]);

  const uniqueSellers = ["All", ...new Set(orders.map((order) => order.sellerName))];
  const statuses = ["All", "Pending", "Accepted", "Out for Delivery", "Delivered"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">View All Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={sellerFilter}
          onChange={(e) => setSellerFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          {uniqueSellers.map((seller, index) => (
            <option key={index} value={seller}>
              {seller}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 border rounded-lg"
        />

        <button
          onClick={() => {
            setSellerFilter("All");
            setStatusFilter("All");
            setDateFilter("");
          }}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Reset Filters
        </button>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-pink-100 text-left">
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Customer Name</th>
                <th className="py-2 px-4 border">Seller</th>
                <th className="py-2 px-4 border">Product</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Order Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{order.id}</td>
                  <td className="py-2 px-4 border">{order.customerName}</td>
                  <td className="py-2 px-4 border">{order.sellerName}</td>
                  <td className="py-2 px-4 border">{order.productName}</td>
                  <td className="py-2 px-4 border">₹{order.price}</td>
                  <td className="py-2 px-4 border">{order.date}</td>
                  <td className="py-2 px-4 border">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default ViewAllOrders;
