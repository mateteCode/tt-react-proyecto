import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProducts,
  updateProductStock,
  deleteProduct,
} from "../../../services/productsService";
import { Loader } from "../../Loader/Loader";
import { Count } from "../../Count/Count";
import "./Dashboard.css";
import { GenreNav } from "../../GenreNav/GenreNav";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStockProduct, setEditingStockProduct] = useState(null);

  const [selectedGenre, setSelectedGenre] = useState(() => {
    return localStorage.getItem("selectedGenre") || "";
  });

  const fetchProducts = (genreToFetch) => {
    setLoading(true);
    getProducts(genreToFetch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(selectedGenre);
  }, [selectedGenre]);

  const handleDelete = async (id, title) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas eliminar "${title}"? Esta acción no se puede deshacer.`,
      )
    ) {
      await deleteProduct(id);
      fetchProducts(); // Recargar lista
    }
  };

  const handleSaveStock = async (newStock) => {
    if (editingStockProduct) {
      await updateProductStock(editingStockProduct.id, newStock);
      setEditingStockProduct(null);
      fetchProducts();
    }
  };

  const handleGenreChange = (newGenre) => {
    setSelectedGenre(newGenre);
    localStorage.setItem("selectedGenre", newGenre);
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

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Portada</th>
              <th>Título</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.title} className="table-img" />
                </td>
                <td>{p.title}</td>
                <td>
                  <span
                    className={`stock-badge ${p.stock <= 0 ? "no-stock" : "has-stock"}`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td>${p.price}</td>
                <td>
                  <div className="action-buttons">
                    {/* Botón Editar (preparado para cuando crees la ruta /edit/:id) */}
                    <Link
                      to={`/admin/products/edit/${p.id}`}
                      className="btn-action edit"
                      title="Editar"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                    <button
                      onClick={() => setEditingStockProduct(p)}
                      className="btn-action stock"
                      title="Modificar Stock"
                    >
                      <i className="fa-solid fa-cubes"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="btn-action delete"
                      title="Eliminar"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POPUP DE STOCK */}
      {editingStockProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Actualizar Stock</h3>
            <p>{editingStockProduct.title}</p>
            <div className="stock-counter-wrapper">
              <Count initial={editingStockProduct.stock} min={0}>
                {(count) => (
                  <button
                    className="btn primary stock-save-btn"
                    onClick={() => handleSaveStock(count)}
                  >
                    Guardar Stock: {count}
                  </button>
                )}
              </Count>
            </div>
            <button
              className="btn outline"
              onClick={() => setEditingStockProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
