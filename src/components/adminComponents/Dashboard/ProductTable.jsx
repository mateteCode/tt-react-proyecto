import { ProductTableRow } from "./ProductTableRow";
import "./ProductTable.css";

export const ProductTable = ({ products, onEditStock, onDelete }) => {
  if (products.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
        No hay libros que coincidan con la búsqueda.
      </p>
    );
  }

  return (
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
            <ProductTableRow
              key={p.id}
              product={p}
              onEditStock={onEditStock}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
