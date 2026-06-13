import { useState, useEffect } from "react";
import { getProducts } from "../services/productsService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGenre, setSelectedGenre] = useState(() => {
    return localStorage.getItem("selectedGenre") || "";
  });

  const fetchProducts = (genreToFetch) => {
    setLoading(true);
    getProducts(genreToFetch)
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(selectedGenre);
  }, [selectedGenre]);

  const handleGenreChange = (newGenre) => {
    setSelectedGenre(newGenre);
    localStorage.setItem("selectedGenre", newGenre);
  };

  return {
    products,
    loading,
    selectedGenre,
    handleGenreChange,
    fetchProducts,
  };
};
