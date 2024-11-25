import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../src/api/apiUrl";
import { useStore } from "../store/cart"; // Importera useStore

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hämta addToCart-funktionen från store
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        const response = await fetch(`${apiUrl}/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error: {error.message || "An unknown error occurred"}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  // Hantera "Add to Cart"
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.discountedPrice || product.price,
      image: product.image,
    });
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <img
        src={product.image?.url || "/default-image.jpg"}
        alt={product.title}
      />
      <p>{product.description}</p>

      {product.discountedPrice && product.discountedPrice < product.price ? (
        <div>
          <p style={{ fontWeight: "bold" }}>
            {parseFloat(product.discountedPrice).toFixed(2)} SEK
          </p>
          <p style={{ textDecoration: "line-through" }}>
            {parseFloat(product.price).toFixed(2)} SEK
          </p>
        </div>
      ) : (
        <p>{parseFloat(product.price).toFixed(2)} SEK</p>
      )}

      <button onClick={handleAddToCart} style={{ marginTop: "10px" }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
