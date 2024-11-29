import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../src/api/apiUrl";
import { useStore } from "../store/cart"; // Importera useStore
import { StarIcon } from "@heroicons/react/24/solid"; // Heroicons för stjärnbetyg

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
      price: product.discountedPrice || product.price,
      image: product.image,
    });
  };

  // Genomsnittligt betyg
  const averageRating = calculateAverageRating(product.reviews);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image?.url || "/default-image.jpg"}
          alt={product.title}
          className="w-full h-auto object-cover rounded-md shadow-md"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            {[...Array(Math.round(averageRating))].map((_, i) => (
              <StarIcon
                key={i}
                className="h-5 w-5 text-yellow-500"
                aria-hidden="true"
              />
            ))}
            <p className="ml-2 text-gray-600">{averageRating} / 5</p>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          {product.discountedPrice &&
          product.discountedPrice < product.price ? (
            <div className="mb-6">
              <p className="text-2xl font-bold text-green-600">
                {parseFloat(product.discountedPrice).toFixed(2)} SEK
              </p>
              <p className="text-lg line-through text-gray-500">
                {parseFloat(product.price).toFixed(2)} SEK
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-800 mb-6">
              {parseFloat(product.price).toFixed(2)} SEK
            </p>
          )}
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-md p-4 shadow-sm bg-gray-50"
              >
                <p className="text-lg font-semibold">{review.username}</p>
                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No reviews available for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
