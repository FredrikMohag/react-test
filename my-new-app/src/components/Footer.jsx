import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 My Store. All rights reserved.</p>
    </footer>
  );
};

// Stilar för Footer
const styles = {
  footer: {
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: "0",
  },
};

export default Footer;
