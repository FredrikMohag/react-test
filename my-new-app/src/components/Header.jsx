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
    // Du kan lägga till logik för att filtrera produkter baserat på sökordet
  };

  return (
    <header style={styles.header}>
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
      <div style={styles.cartContainer}>
        <CartIcon itemCount={cartItemCount} />
        {/* Här kan du lägga till en knapp för att lägga till produkter i kundvagnen */}
        <button
          onClick={() =>
            addToCart({ id: 1, name: "Example Product", price: 99.99 })
          }
        >
          Add Product to Cart
        </button>
      </div>
    </header>
  );
};

// Stilar för Header
const styles = {
  header: {
    padding: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "center",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    padding: 0,
  },
  cartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "10px",
  },
};

export default Header;
