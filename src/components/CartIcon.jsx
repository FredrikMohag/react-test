import React from "react";
import { useStore } from "../store/cart";
import cartImage from "../assets/cart.png"; // Importera bilden direkt

export const CartIcon = ({ iconSize = 30, badgeSize = 12 }) => {
  // Hämta cart från store för att räkna antalet produkter
  const cart = useStore((state) => state.cart);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="cart-icon"
      style={{ width: iconSize, height: iconSize, position: "relative" }}
    >
      <img
        src={cartImage} // Använd den importerade bilden
        alt="Cart"
        className="icon"
        style={{ width: iconSize, height: iconSize }}
      />
      {itemCount > 0 && (
        <span
          className="badge"
          style={{
            fontSize: badgeSize,
            width: badgeSize * 2,
            height: badgeSize * 2,
            lineHeight: `${badgeSize * 2}px`,
            textAlign: "center",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};
