import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../src/api/apiUrl";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Using apiUrl:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-600">
          Error:{" "}
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Welcome to Our Store
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No products available.
          </p>
        ) : (
          products.map((product) => {
            console.log("Product:", product);

            const price = parseFloat(product.price);
            const discountedPrice = parseFloat(product.discountedPrice);
            const isDiscounted = discountedPrice && discountedPrice < price;

            return (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4"
              >
                <img
                  src={product.image?.url || "/default-image.jpg"}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>

                {isDiscounted ? (
                  <div className="mb-4">
                    <p className="text-lg font-bold text-green-600">
                      {discountedPrice.toFixed(2)} SEK
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      {price.toFixed(2)} SEK
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    {price.toFixed(2)} SEK
                  </p>
                )}

                <Link
                  to={`/product/${product.id}`}
                  className="block text-center bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-500 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
