import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../my-vite-app/src/api/apiUrl"; // Importera apiUrl från apiUrl.jsx

const ProductPage = () => {
  const { productId } = useParams(); // Hämta produkt-ID från URL-parametrar
  const [product, setProduct] = useState(null); // Förvara produktdata
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hämta produktdata för en enskild produkt
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return; // Om det inte finns något produkt-ID, gör inget

      try {
        const response = await fetch(`${apiUrl}/${productId}`); // Använd apiUrl här
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.data); // Sätt produktdata i state
      } catch (error) {
        setError(error); // Sätt error om det händer något
      } finally {
        setLoading(false); // Stäng loading när datan har hämtats
      }
    };

    fetchProduct();
  }, [productId]); // Kör om när produkt-ID ändras

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    // Felhantering för error
    return <p>Error: {error.message || "An unknown error occurred"}</p>;
  }

  // Om ingen produkt hittades
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.image?.url || "/default-image.jpg"}
        alt={product.title}
      />
      <p>{product.description}</p>

      {/* Kontrollera om rabatterat pris finns och om det är lägre än fullpriset */}
      {product.discountedPrice && product.discountedPrice < product.price ? (
        <div>
          {/* Visa det rabatterade priset först */}
          <p style={{ fontWeight: "bold" }}>
            {parseFloat(product.discountedPrice).toFixed(2)} SEK
          </p>
          {/* Visa fullpriset genomstruket */}
          <p style={{ textDecoration: "line-through" }}>
            {parseFloat(product.price).toFixed(2)} SEK
          </p>
        </div>
      ) : (
        // Om det inte finns ett rabatterat pris eller om det är lika med fullpriset, visa bara fullpriset
        <p>{parseFloat(product.price).toFixed(2)} SEK</p>
      )}

      <a href="/cart">Add to Cart</a>
    </div>
  );
};

export