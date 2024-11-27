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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">Your Cart</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="flex border-b-2 border-gray-200">
          <div className="flex-1 p-4 text-lg font-medium text-gray-700">
            Product
          </div>
          <div className="w-32 p-4 text-lg font-medium text-gray-700">
            Price
          </div>
          <div className="w-32 p-4 text-lg font-medium text-gray-700">
            Quantity
          </div>
          <div className="w-32 p-4 text-lg font-medium text-gray-700">
            Subtotal
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center p-4">
              {/* Produktbild och titel */}
              <div className="flex-1 flex items-center">
                <img
                  src={item.image?.url || "/default-image.jpg"}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <span className="text-lg font-medium text-gray-800">
                  {item.title}
                </span>
              </div>

              {/* Pris */}
              <div className="w-32 text-lg text-gray-700">
                ${parseFloat(item.price).toFixed(2)}
              </div>

              {/* Quantity and Controls */}
              <div className="w-32 flex items-center justify-center space-x-2">
                <span className="text-lg">{item.quantity}</span>
                <div className="space-x-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    -
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="w-32 text-lg font-medium text-gray-700">
                ${parseFloat(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-end space-y-4">
        {/* Total */}
        <div className="flex text-xl font-semibold text-gray-800">
          <span className="mr-4">Total:</span>
          <span className="text-2xl text-green-600">${total}</span>
        </div>

        <div className="flex space-x-4">
          {/* Clear Cart Button */}
          {cart.length > 0 && (
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          )}

          {/* Checkout Button */}
          <Link to={`/checkoutSuccess`}>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
