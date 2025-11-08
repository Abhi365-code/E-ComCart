import { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { fetchCartCount } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [receipt, setReceipt] = useState(null);

  const checkoutNow = async () => {
    if (!name || !email) return alert("Enter name & email");

    try {
      const res = await axios.post("/api/checkout", { name, email });
      setReceipt(res.data);

      // clear cart instantly UI side
      await fetchCartCount();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">Checkout</h1>

      {!receipt ? (
        <div className="space-y-3 bg-white shadow-md p-5 rounded-xl border">
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full p-3 rounded"
          />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-3 rounded"
          />

          <button
            onClick={checkoutNow}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold"
          >
            Pay & Checkout
          </button>
        </div>
      ) : (
        <div className="bg-green-50 p-5 rounded-xl shadow-md text-center border border-green-300">
          <h2 className="text-xl font-bold text-green-700 mb-3">Payment Successful!</h2>
          <p>Total Paid: ₹{receipt.total}</p>
          <p>Time: {receipt.time}</p>

          <div className="mt-3 text-gray-700">
            <p>Name: {receipt.name}</p>
            <p>Email: {receipt.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}






