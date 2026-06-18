import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateProductStock,
  deleteProduct,
} from "../../../services/productsService";
import { Loader } from "../../Loader/Loader";
import { GenreNav } from "../../GenreNav/GenreNav";
import { useProducts } from "../../../hooks/useProducts";
import { useModal } from "../../../context/ModalContext";
import { StockModal } from "./StockModal";
import { ProductTable } from "./ProductTable";

import "./Dashboard.css";

export const Dashboard = () => {
  const { products, loading, selectedGenre, handleGenreChange, fetchProducts } =
    useProducts();
  const [editingStockProduct, setEditingStockProduct] = useState(null);
  const { showConfirm, showAlert } = useModal();

  const handleDelete = (id, title) => {
    showConfirm(
      "Eliminar libro",
      `¿Estás seguro que deseas eliminar "${title}" permanentemente de la base de datos?`,
      async () => {
        try {
          await deleteProduct(id);
          fetchProducts(selectedGenre);
          showAlert("Eliminado", "El libro ha sido eliminado con éxito.");
        } catch (error) {
          showAlert("Error", "Hubo un problema al intentar eliminar el libro.");
        }
      },
    );
  };

  const handleSaveStock = async (newStock) => {
    if (editingStockProduct) {
      await updateProductStock(editingStockProduct.id, newStock);
      setEditingStockProduct(null);
      fetchProducts(selectedGenre);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header-title">
        <h2>Gestión de Inventario</h2>
        <Link to="/admin/products/new" className="btn primary">
          + Nuevo Libro
        </Link>
      </div>

      <GenreNav currentGenre={selectedGenre} onSelect={handleGenreChange} />

      <ProductTable
        products={products}
        onEditStock={setEditingStockProduct}
        onDelete={handleDelete}
      />

      {editingStockProduct && (
        <StockModal
          product={editingStockProduct}
          onSave={handleSaveStock}
          onClose={() => setEditingStockProduct(null)}
        />
      )}
    </div>
  );
};
