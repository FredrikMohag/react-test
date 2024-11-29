import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api/apiUrl";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setProducts(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterProducts = debounce(() => {
      if (searchTerm && Array.isArray(products)) {
        const results = products
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 4);
        setFilteredProducts(results);
      } else {
        setFilteredProducts([]);
      }
    }, 300);

    filterProducts();

    return () => {
      filterProducts.cancel();
    };
  }, [searchTerm, products]);

  const handleProductClick = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Inputfält */}
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm text-gray-800 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>

        {/* Dynamiskt meddelande */}
        {filteredProducts.length === 0 && searchTerm && (
          <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 pointer-events-none">
            No products found
          </span>
        )}
      </form>

      {/* Resultatlista */}
      {filteredProducts.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-2">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              onClick={handleProductClick}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              <img
                src={product.image?.url || "/default-image.jpg"}
                alt={product.title}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {product.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
