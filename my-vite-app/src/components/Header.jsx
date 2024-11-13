import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // Importera SearchBar-komponenten

const Header = () => {
  // Funktion som hanterar sökningen
  const handleSearch = (searchTerm) => {
    console.log("Sökterm:", searchTerm);
    // Här kan du lägga till logik för att hantera sökningen,
    // t.ex. filtrera produkter eller navigera till en söksida
  };

  return (
    <header>
      <h1>My Online Store</h1>
      <nav>
        <ul>
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
      {/* Lägg till SearchBar under navigeringen */}
      <SearchBar onSearch={handleSearch} />
    </header>
  );
};

export default Header;
