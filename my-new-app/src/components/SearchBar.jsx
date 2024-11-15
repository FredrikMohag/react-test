import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../my-vite-app/src/api/apiUrl"; // Importera bas-URL:en
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Hantera input-ändringar
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hämta produktdata från API när komponenten laddas
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl); // Använd bas-URL:en här
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

  // Filtrera produkterna baserat på sökordet
  useEffect(() => {
    const filterProducts = debounce(() => {
      if (searchTerm && Array.isArray(products)) {
        const results = products
          .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 4); // Begränsa till max 4 produkter
        setFilteredProducts(results);
      } else {
        setFilteredProducts([]);
      }
    }, 300); // Debounce-tid (300ms)

    filterProducts(); // Anropa den debouncade funktionen när sökterm ändras

    return () => {
      filterProducts.cancel(); // Avbryt tidigare debounced anrop när komponenten tas bort
    };
  }, [searchTerm, products]);

  const handleProductClick = () => {
    setSearchTerm(""); // Rensa sökordet när man klickar på en produkt
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{ width: "150px", textAlign: "center" }}
              >
                <Link
                  to={`/product/${product.id}`}
                  onClick={handleProductClick}
                >
                  <img
                    src={product.image?.url || "/default-image.jpg"}
                    alt={product.title}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                  <h4>{product.title}</h4>
                </Link>
              </div>
            ))
          : searchTerm && <p>No products found</p>}
      </div>
    </div>
  );
};

expo