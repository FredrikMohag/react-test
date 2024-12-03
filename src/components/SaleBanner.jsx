// src/components/SaleBanner.jsx

import React from "react";

const SaleBanner = () => {
  return (
    <div>
      {/* SALE text - rullar från höger till vänster med svart bakgrund och vit text */}
      <div className="relative w-full bg-black text-white h-20 flex justify-center items-center overflow-hidden">
        <div className="absolute whitespace-nowrap animate-marquee-sale">
          {[...Array(30)].map((_, index) => (
            <span key={index} className="text-5xl font-bold mx-6">
              SALE
            </span>
          ))}
        </div>
      </div>

      {/* LIVE NOW text - rullar från vänster till höger med neon grön bakgrund */}
      <div className="relative w-full bg-green-600 text-white h-20 flex justify-center items-center overflow-hidden">
        <div className="absolute whitespace-nowrap animate-marquee-live">
          {[...Array(30)].map((_, index) => (
            <span key={index} className="text-5xl font-bold mx-6">
              LIVE NOW
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
