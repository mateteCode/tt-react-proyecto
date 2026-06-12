import { useState } from "react";
import "./ProductFormContainer.css";
import { useNavigate } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../utils/validateProduct";
import { uploadImage } from "../../services/uploadImage";
import { createProduct } from "../../services/productsService";

export const ProductFormContainer = () => {
  const initialProduct = {
    title: "",
    author: "",
    description: "",
    year: 0,
    genre: "",
    price: 0,
    image: "",
    pages: 0,
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(initialProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = validateProduct({ ...product, file });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      const id = await createProduct({
        ...product,
        year: Number(product.year),
        price: Number(product.price),
        pages: Number(product.pages),
        image: imageUrl,
      });
      setProduct(initialProduct);
      setFile(null);
      navigate(`/success/${id}`, { replace: true });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
