import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Ban, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const storedSellers = JSON.parse(localStorage.getItem("sellers")) || [];
    setSellers(storedSellers);
  }, []);

  const updateSellers = (updatedSellers) => {
    setSellers(updatedSellers);
    localStorage.setItem("sellers", JSON.stringify(updatedSellers));
  };

  const handleApprove = (id) => {
    const updated = sellers.map((seller) =>
      seller.id === id ? { ...seller, status: "approved" } : seller
    );
    updateSellers(updated);
    toast.success("Seller Approved!");
  };

  const handleReject = (id) => {
    const updated = sellers.map((seller) =>
      seller.id === id ? { ...seller, status: "rejected" } : seller
    );
    updateSellers(updated);
    toast.error("Seller Rejected!");
  };

  const handleToggleBlock = (id) => {
    const updated = sellers.map((seller) =>
      seller.id === id ? { ...seller, isBlocked: !seller.isBlocked } : seller
    );
    updateSellers(updated);
    toast.info("Seller block/unblock status updated!");
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      seller.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || seller.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-pink-600">Manage Sellers</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4 justify-between mb-8">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredSellers.length === 0 ? (
        <p className="text-gray-600 text-center">No matching sellers found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200"
            >
              {/* Seller Info */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">{seller.businessName}</h2>
                <p className="text-gray-600">{seller.email}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      seller.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : seller.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                  </span>
                  {seller.isBlocked && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">Blocked</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
                {seller.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(seller.id)}
                      className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                    >
                      <CheckCircle size={18} /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(seller.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                    >
                      <XCircle size={18} /> Reject
                    </button>
                  </>
                )}

                {seller.status === "approved" && (
                  <button
                    onClick={() => handleToggleBlock(seller.id)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full transition ${
                      seller.isBlocked
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {seller.isBlocked ? (
                      <>
                        <ShieldCheck size={18} /> Unblock
                      </>
                    ) : (
                      <>
                        <Ban size={18} /> Block
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSellers;
