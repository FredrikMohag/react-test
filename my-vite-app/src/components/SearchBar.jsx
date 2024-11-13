// src/components/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Hantera input-ändringar
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Hantera formulärinlämning
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`); // Navigera till söksidan
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search products..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
