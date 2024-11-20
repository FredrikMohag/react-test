import React from "react";

export const CartIcon = ({ itemCount, iconSize = 30, badgeSize = 12 }) => {
  return (
    <div className="cart-icon" style={{ width: iconSize, height: iconSize }}>
      <img
        src="/assets/cart.png"
        alt="Cart"
        className="icon"
        style={{ width: iconSize, height: iconSize }} // Behåll storleksjustering här
      />
      {itemCount > 0 && (
        <span
          className="badge"
          style={{
            fontSize: badgeSize,
            width: badgeSize * 2,
            height: badgeSize * 2,
          }}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};
