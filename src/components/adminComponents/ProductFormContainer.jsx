import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../utils/validateProduct";
import { uploadImage } from "../../services/uploadImage";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../services/productsService";

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
    stock: 0,
  };
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(initialProduct);

  // Si estamos editando, buscamos los datos en la base
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getProductById(id).then((data) => {
        if (data) setProduct(data);
        setLoading(false);
      });
    }
  }, [id, isEdit]);

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

    const newErrors = validateProduct({ ...product, file }, isEdit);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let imageUrl = product.image;
      if (file) {
        imageUrl = await uploadImage(file);
      }

      const productData = {
        ...product,
        year: Number(product.year),
        price: Number(product.price),
        pages: Number(product.pages),
        stock: Number(product.stock),
        image: imageUrl,
      };

      if (isEdit) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }

      setProduct(initialProduct);
      setFile(null);
      //navigate(`/success/${id}`, { replace: true });
      navigate("/admin/dashboard");
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEdit={isEdit}
    />
  );
};
