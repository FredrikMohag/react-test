import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../api/apiUrl"; // Importera apiUrl från apiUrl.jsx

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
        setLoading(false); // Stäng loadi