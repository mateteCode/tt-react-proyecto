import { useState, useEffect } from "react";
import { getProductById } from "../services/productsService";

export const useProductDetail = (id) => {
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((err) => console.error("Error fetching product detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  return { itemDetail, loading };
};
