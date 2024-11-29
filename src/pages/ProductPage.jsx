import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../src/api/apiUrl";
import { useStore } from "../store/cart"; // Importera useStore
import { StarIcon } from "@heroicons/react/solid"; // Heroicons för stjärnbetyg

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
        const response = await fetch(`${apiUrl}/${productId}`); // Korrigering här
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

  // Beräkna genomsnittligt betyg
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Returnerar genomsnittet med en decimal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-600">
          Error: {error.message || "An unknown error occurred"}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-600">Product not found.</p>
      </div>
    );
  }

  // Hantera "Add to Cart"
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.d