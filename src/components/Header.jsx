import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartIcon } from "./CartIcon";

const Header = () => {
  // State för att hålla koll på om användaren har skrollat ner
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State för att hantera menyn

  // Logga initialt tillstånd
  console.log("Initial isScrolled state:", isScrolled);

  // Effect för att lyssna på skroll-händelser
  useEffect(() => {
    const handleScroll = () => {
      // Om skrollpositionen är större än 50px, sätt isScrolled till true
      if (window.scrollY > 50) {
        if (!isScrolled) {
          console.log("User has scrolled down. Updating isScrolled to true.");
          setIsScrolled(true);
        }
      } else {
        if (isScrolled) {
          console.log("User has scrolled up. Updating isScrolled to false.");
          setIsScrolled(false);
        }
      }
    };

    // Lägg till skroll-lyssnaren när komponenten laddas
    window.addEventListener("scroll", handleScroll);

    // Rensa skroll-lyssnaren när komponenten avmonteras
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""}`} // Lägg till 'scrolled' klass när användaren skrollat
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300"
        >
          My Store
        </Link>

        {/* Centered Search Bar */}
        <div className="flex-1 mx-8 hidden md:block">
          <SearchBar
            onSearch={(searchTerm) => console.log("Sökterm:", searchTerm)}
          />
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex items-center space-x-8">
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

        {/* Hamburger Menu for Small Screens */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Visa ☰ om menyn är stängd, visa × om menyn är öppen */}
          {isMenuOpen ? "×" : "☰"}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } backdrop-blur-md md:backdrop-blur-none`} // Här justeras backdrop-blur effekten på mindre skärmar
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-3xl"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-12">
            <Link
              to="/"
              className="text-white text-lg font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-white text-lg font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/checkout"
              className="flex items-center text-white text-lg font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
