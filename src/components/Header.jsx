import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartIcon } from "./CartIcon";

const Header = () => {
  // State för att hålla koll på om användaren har skrollat ner
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect för att lyssna på skroll-händelser
  useEffect(() => {
    const handleScroll = () => {
      // Om skrollpositionen är större än 50px, sätt isScrolled till true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Lägg till skroll-lyssnaren när komponenten laddas
    window.addEventListener("scroll", handleScroll);

    // Rensa skroll-lyssnaren när komponenten avmonteras
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""}`} // Lägg till 'scrolled' klass när användaren skrollat
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300"
        >
          My Store
        </Link>

        {/* Centered Search Bar */}
        <div className="flex-1 mx-8">
          <SearchBar
            onSearch={(searchTerm) => console.log("Sökterm:", searchTerm)}
          />
        </div>

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
    </header>
  );
};

export default Header;
