import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        const response = await fetch(
          `https://v2.api.noroff.dev/online-shop/${productId}`
        );
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
      <p>{product.price} SEK</p>
      {/* Lägg till en länk tillbaka till hem-sidan eller en annan sida */}
      <a href="/cart">Add to Cart</a>
    </div>
  );
};

export default ProductPage;
