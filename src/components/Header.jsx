import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartIcon } from "./CartIcon";
import { useStore } from "../store/cart"; // Ändra till named import här

const Header = () => {
  // Hämta cart från store
  const cart = useStore((state) => state.cart);

  // Räkna antalet produkter i kundvagnen
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (searchTerm) => {
    console.log("Sökterm:", searchTerm);
  };

  return (
    <header className="header">
      <h1>My Online Store</h1>
      <nav>
        <ul className="navList">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/checkout">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <SearchBar onSearch={handleSearch} />
      <div className="cartContainer">
        {/* Passa itemCount som prop */}
        <CartIcon itemCount={itemCount} />
      </div>
    </header>
  );
};

export default Header;
