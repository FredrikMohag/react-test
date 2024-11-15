import React from "react";

export const CartIcon = ({ itemCount, iconSize = 30, badgeSize = 12 }) => {
  return (
    <div style={{ ...styles.cartIcon, width: iconSize, height: iconSize }}>
      <img
        src="/cart-icon.png"
        alt="Cart"
        style={{ ...styles.icon, width: iconSize, height: iconSize }}
      />
      {itemCount > 0 && (
        <span
          style={{
            ...styles.badge,
            fontSize: badgeSize,
            width: badgeSize * 2, // Dynamically adjust the width based on font size
            height: badgeSize * 2, // Dynamically adjust the height based on font size
          }}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};

// Stilar för CartIcon
const styles = {
  cartIcon: {
    position: "relative",
    display: "inline-block",
  },
  icon: {
    display: "block",
  },
  badge: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "1",
  },
};
