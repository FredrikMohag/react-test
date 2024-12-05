import React from "react";
import { Link } from "react-router-dom";

const ProductAll = ({ products }) => {
  // Loggar hela produktlistan vid rendering
  console.log("ProductAll rendered with products:", products);

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.length === 0 ? (
        <>
          {console.log("No products available")}
          <p className="col-span-full text-center text-gray-600">
            No products available.
          </p>
        </>
      ) : (
        products.map((product) => {
          const price = parseFloat(product.price);
          const discountedPrice = parseFloat(product.discountedPrice);
          const isDiscounted = discountedPrice && discountedPrice < price;

          // Loggar data för varje produkt som renderas
          console.log("Rendering product:", {
            id: product.id,
            title: product.title,
            price,
            discountedPrice,
            isDiscounted,
          });

          return (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col h-full"
            >
              <img
                src={product.image?.url || "/default-image.jpg"}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 flex-grow overflow-hidden line-clamp-3">
                {product.description}
              </p>

              {/* Priser, med det gamla priset till höger om det nya om på rea */}
              <div className="mt-4 flex items-center justify-between">
                {isDiscounted ? (
                  <div className="flex items-center">
                    <p className="text-lg font-bold text-green-600">
                      ${discountedPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 line-through ml-2">
                      ${price.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-800">
                    ${price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Se till att knappen är längst ner */}
              <div className="mt-auto">
                <Link
                  to={`/product/${product.id}`}
                  className="block text-center bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-500 transition-colors duration-300"
                  onClick={() =>
                    console.log(
                      `Clicked View Details for product id: ${product.id}`
                    )
                  }
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductAll;
