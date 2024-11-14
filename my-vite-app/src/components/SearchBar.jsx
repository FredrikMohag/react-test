// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api/apiUrl"; // Importera bas-URL:en

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

        console.log("Fetched products:", result); // Debug: Kontrollera datan
        // Här antar vi att produkterna finns under `result.data`
        setProducts(Array.isArray(result.data) ? result.data : []); // Verifiera att `result.data` är en array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Sätt en tom array om hämtningen misslyckas
      }
    };

    fetchProducts();
  }, []);

  // Filtrera produkterna baserat på sökordet
  useEffect(() => {
    console.log("Current searchTerm:", searchTerm); // Debug: Kontrollera sökordet
    if (searchTerm && Array.isArray(products)) {
      const results = products
        .filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 4); // Begränsa till max 4 produkter

      console.log("Filtered products:", results); // Debug: Kontrollera filtrerade produkter
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Rensa resultaten om sökrutan är tom
    }
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

export default SearchBar;
