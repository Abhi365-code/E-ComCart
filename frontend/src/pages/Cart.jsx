import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);

  // get cart items from backend
  const loadCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      setCartData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Remove Item
  const removeItem = async (id) => {
    try {
      await axios.delete(`/api/cart/${id}`);
      await loadCart();          // refresh page cart
      await fetchCartCount();    // refresh navbar count
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (!cartData) return <p className="text-center mt-6">Loading cart...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-5 text-center">Cart</h1>

      {cartData.items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartData.items.map((i) => (
            <div
              key={i.productId._id}
              className="flex justify-between items-center p-4 border rounded-lg bg-yellow-50 shadow-sm"
            >
              <div>
                <h2 className="font-bold text-lg text-blue-700">{i.productId.name}</h2>
                <p>Price: ₹{i.productId.price}</p>
                <p>Qty: {i.qty}</p>
              </div>

              <button
                onClick={() => removeItem(i.productId._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-lg text-blue-700">
            Total: ₹{cartData.total}
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Go to Checkout
          </button>
        </div>
      )}
    </div>
  );
}




