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
    // Du kan lägga till logik för att filtrera produkter baserat p