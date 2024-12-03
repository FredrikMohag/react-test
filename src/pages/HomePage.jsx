import { useEffect, useState } from "react";
import { apiUrl } from "../../src/api/apiUrl";
import ProductAll from "../components/ProductAll"; // Importera den nya komponenten
import SaleBanner from "../components/SaleBanner"; // Importera SaleBanner

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
      {/* Lägg till SaleBanner högst upp */}
      <SaleBanner />
      {/* Visa produkterna */}
      <ProductAll products={products} />
    </div>
  );
};

export default HomePage;
