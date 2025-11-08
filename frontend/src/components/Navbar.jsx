import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export default function Navbar() {
  const { cartCount } = useContext(CartContext); // get live count

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">Vibe Commerce</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-yellow-300">
          Products
        </Link>

        <Link to="/cart" className="hover:text-yellow-300 relative">
          Cart
          {cartCount > 0 && (
            <span className="ml-1 bg-yellow-400 text-blue-700 rounded-full px-2 text-sm font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/checkout" className="hover:text-yellow-300">
          Checkout
        </Link>
      </div>
    </nav>
  );
}



