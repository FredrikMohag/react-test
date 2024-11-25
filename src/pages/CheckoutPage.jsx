import React from "react";
import { useStore } from "../store/cart"; // Importera useStore från din zustand store
import { Link } from "react-router-dom"; // Importera Link

export default function CheckOutPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useStore();

  // Uppdaterad för att beräkna totalen med kvantitet
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleAddToCart = (item) => {
    addToCart(item); // Lägg till item utan att skapa nytt objekt
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId); // Antingen minska quantity eller ta bort objektet
  };

  return (
    <div className="checkout-container">
      <h2>Your Cart</h2>

      <div className="cart-table">
        <div className="cart-header">
          <div className="header-item">Product</div>
          <div className="header-item">Price</div>
          <div className="header-item">Quantity</div>
          <div className="header-item">Subtotal</div>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Product */}
              <div className="cart-item-image">
                <img
                  src={item.image?.url || "/default-image.jpg"}
                  alt={item.title}
                  className="item-image"
                />
                <div className="cart-item-title">{item.title}</div>
              </div>

              {/* Price */}
              <div className="cart-item-price">
                ${parseFloat(item.price).toFixed(2)}
              </div>

              {/* Quantity and Controls */}
              <div className="cart-item-quantity-controls">
                <div className="cart-item-quantity">{item.quantity}</div>
                <div className="item-controls">
                  <button
                    className="add-item-button"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                  <button
                    className="remove-item-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="cart-item-subtotal">
                ${parseFloat(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-summary">
        <div className="total">
          <span className="total-text">Total: </span>
          <span className="total-price">${total}</span>
        </div>

        <div className="checkout-buttons">
          {cart.length > 0 && (
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
          )}

          <Link to={`/checkoutSuccess`}>
            <button className="checkout-cart-button">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
