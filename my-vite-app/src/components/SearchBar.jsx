import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api/apiUrl"; // Importera bas-URL:en
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Hantera input-ändringar
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hämta produktdata från API när komponenten laddas
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl); // Använd bas-URL:en här
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        setProducts(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Filtrera produkterna baserat på sökordet
  useEffect(() => {
    const filterProducts = debounce(() => {
      if (searchTerm && Array.isArray(products)) {
        const res