import React from "react";
import { useStore } from "../store/cart";
import cartImage from "../assets/cart.png"; // Importera bilden direkt

export const CartIcon = ({ iconSize = 30, badgeSize = 12 }) => {
  // Hämta cart från store för att räkna antalet produkter
  const cart = useStore((state) => state.cart);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: iconSize, height: iconSize }}
    >
      <img
        src={cartImage} // Använd den importerade bilden
        alt="Cart"
        className="block"
        style={{ width: iconSize, height: iconSize }}
      />
      {itemCount > 0 && (
        <span
          className="absolute bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full"
          style={{
            width: badgeSize * 2,
            height: badgeSize * 2,
            fontSize: badgeSize - 4,
            top: -badgeSize / 2,
            right: -badgeSize / 2,
          }}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};
