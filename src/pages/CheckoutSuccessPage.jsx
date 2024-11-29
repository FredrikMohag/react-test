import React, { useEffect } from "react";
import { useStore } from "../store/cart"; // Se till att importera din zustand store här

const CheckoutSuccessPage = () => {
  // Hämta funktionen för att tömma kundvagnen från store
  const clearCart = useStore((state) => state.clearCart);

  // Använd useEffect för att tömma kundvagnen när sidan renderas
  useEffect(() => {
    clearCart(); // Töm kundvagnen
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white space-y-6 px-4 md:px-10">
        <h1 className="text-4xl md:text-6xl font-bold animate-bounce">
          🎉 Thank You for Your Purchase! 🎉
        </h1>
        <p className="text-lg md:text-xl">
          Your order was successfully placed. We truly appreciate your business!
        </p>
        <div className="flex justify-center items-center space-x-4 mt-8">
          <a
            href="/shop"
            className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-md hover:bg-gray-200 shadow-lg transform transition-transform hover:scale-110"
          >
            Continue Shopping
          </a>
          <a
            href="/"
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 shadow-lg transform transition-transform hover:scale-110"
          >
            Home
          </a>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {/* Background Effects */}
        <div className="absolute w-48 h-48 bg-pink-300 rounded-full blur-3xl opacity-50 top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-40 bottom-1/4 right-1/3 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-50 top-1/2 left-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
