import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { fetchCartCount } = useContext(CartContext);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post("/api/cart", { productId, qty: 1 });
      await fetchCartCount(); 
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="p-4 m-4 rounded-xl shadow-lg bg-white border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-blue-700">{product.name}</h2>
          <p className="text-gray-700 mt-1">₹{product.price}</p>

          <button
            onClick={() => addToCart(product._id)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg w-full transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}









