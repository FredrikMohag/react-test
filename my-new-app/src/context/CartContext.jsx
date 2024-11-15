// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from "react";

// Skapa en kontext för kundvagnen
const CartContext = createContext();

// Skapa en CartProvider-komponent som gör kundvagnens data tillgänglig för andra komponenter
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0); // Håller reda på antal varor i kundvagnen

  // Funktion för att lägga till en vara i kundvagnen
  const addToCart = () => {
    setCartItemCount((prevCount) => prevCount + 1);
  };

  // Funktion för att ta bort en vara från kundvagnen
  const removeFromCart = () => {
    setCartItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  // Funktion för att återställa kundvagnen (t.ex. när användaren gör en beställning)
  const clearCart = () => {
    setCartItemCount(0);
  };

  return (
    <CartContext.Provider
      value={{ cartItemCount, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// En custom hook för att använda CartContext i andra komponenter
export const useCart = () => useContext(CartContext);
