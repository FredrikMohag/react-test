// src/components/CartIcon.jsx

import React from "react";

export const CartIcon = ({ itemCount }) => {
  return (
    <div style={styles.cartIcon}>
      <img src="/cart-icon.png" alt="Cart" style={styles.icon} />
      {itemCount > 0 && <span style={styles.badge}>{itemCount}</span>}
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
    width: "30px",
    height: "30px",
  },
  badge: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "5px 10px",
    fontSize: "12px",
  },
};
