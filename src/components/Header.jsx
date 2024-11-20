import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartIcon } from "./CartIcon";

const Header = () => {
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
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <SearchBar onSearch={handleSearch} />
      <div className="cartContainer">
        <CartIcon itemCount={0} />
        <button onClick={() => console.log("Add product to cart")}>
          Add Product to Cart
        </button>
      </div>
    </header>
  );
};

export default Header;
