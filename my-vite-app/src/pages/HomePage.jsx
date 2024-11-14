// src/components/HomePage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api/apiUrl"; // Importera bas-URL:en

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Using apiUrl:", apiUrl); // Kontrollera att apiUrl är korrekt
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Kontrollera datan som hämtas

        setProducts(Array.isArray(data.data) ? data.data : []); // Kontrollera att data är en array
      } catch (error) {
        console.error("Error fetching products:", error); // Logga eventuella fel
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return (
      <p>
        Error:{" "}
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </p>
    );
  }

  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image?.url || "/default-image.jpg"}
                alt={product.title}
                style={{ objectFit: "cover" }}
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>{parseFloat(product.price).toFixed(2)} SEK</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
