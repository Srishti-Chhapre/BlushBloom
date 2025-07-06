import { useEffect, useState } from "react";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [userSearch, setUserSearch] = useState("");
  const [sellerSearch, setSellerSearch] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedSellers = JSON.parse(localStorage.getItem("sellers")) || [];

    setUsers(storedUsers);
    setSellers(storedSellers);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredSellers = sellers.filter((seller) =>
    seller.businessName.toLowerCase().includes(sellerSearch.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">View Users</h1>

      {/* Customers Section */}
      <section className="mb-14">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Customers</h2>
          <input
            type="text"
            placeholder="Search customers..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {filteredUsers.length === 0 ? (
          <p className="text-gray-600 text-center">No matching customers found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <div
                key={user.email} 
                className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{user.name}</h3>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-gray-600 mb-3">{user.phone}</p>
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                  Customer
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sellers Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Sellers</h2>
          <input
            type="text"
            placeholder="Search sellers..."
            value={sellerSearch}
            onChange={(e) => setSellerSearch(e.target.value)}
            className="p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {filteredSellers.length === 0 ? (
          <p className="text-gray-600 text-center">No matching sellers found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSellers.map((seller) => (
              <div
                key={seller.email} 
                className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{seller.businessName}</h3>
                <p className="text-gray-600 mb-1">{seller.email}</p>
                <p className="text-gray-600 mb-3 capitalize">Status: {seller.status}</p>
                <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
                  Seller
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ViewUsers;
