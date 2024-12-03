// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        "marquee-sale": "marquee-sale 30s linear infinite", // Långsammare hastighet
        "marquee-live": "marquee-live 30s linear infinite", // Långsammare hastighet
      },
      keyframes: {
        "marquee-sale": {
          "0%": { transform: "translateX(100%)" }, // Börjar utanför skärmen till höger
          "100%": { transform: "translateX(-100%)" }, // Går hela vägen till vänster
        },
        "marquee-live": {
          "0%": { transform: "translateX(-100%)" }, // Börjar utanför skärmen till vänster
          "100%": { transform: "translateX(100%)" }, // Går hela vägen till höger
        },
      },
    },
  },
  plugins: [],
};
