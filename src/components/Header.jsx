import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartIcon } from "./CartIcon";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300"
        >
          My Store
        </Link>

        {/* Navbar */}
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className="hover:text-indigo-300 text-lg font-medium transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="hover:text-indigo-300 text-lg font-medium transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/checkout"
            className="flex items-center hover:text-indigo-300 transition-colors duration-300"
          >
            <CartIcon />
          </Link>
        </nav>
      </div>

      {/* Centered Search Bar */}
      <div className="flex justify-center py-4">
        <SearchBar
          onSearch={(searchTerm) => console.log("Sökterm:", searchTerm)}
        />
      </div>
    </header>
  );
};

export default Header;
