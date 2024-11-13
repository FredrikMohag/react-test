import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]); // Ta bort typdefinitionen
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hämta produktdata från API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data); // Sätt produkterna i state
      } catch (error) {
        setError(error); // Hantera fel
      } finally {
        setLoading(false); // Stäng loading när data är hämtad
      }
    };

    fetchProducts();
  }, []);

  // Laddningsskärm
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Felhantering
  if (error) {
    // Kontrollera om felet är en instans av Error
    if (error instanceof Error) {
      return <p>Error: {error.message}</p>;
    } else {
      return <p>An unknown error occurred</p>;
    }
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
                src={product.image?.url || "/default-image.jpg"} // Fallback om ingen bild finns
                alt={product.title}
                style={{ objectFit: "cover" }} // Lägger till lite styling
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>{parseFloat(product.price).toFixed(2)} SEK</p>{" "}
              {/* Omvandlar pris till tal och visar två decimaler */}
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
