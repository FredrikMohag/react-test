// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // Default import
import { CartIcon } from "./CartIcon"; // Importera CartIcon som named export
import { useCart } from "../context/CartContext"; // Importera useCart

const Header = () => {
  const { cartItemCount, addToCart } = useCart(); // Använd cartItemCount från CartContext

  // Funktion som hanterar sökningen
  const handleSearch = (searchTerm) => {
    console.log("Sökterm:", searchTerm);
  };

  return (
    <header>
      <h1>My Online Store</h1>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <SearchBar onSearch={handleSearch} />
      <CartIcon itemCount={cartItemCount} />
    </header>
  );
};

// Stilar för Header
const styles = {
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
  },
};

export default Header;
