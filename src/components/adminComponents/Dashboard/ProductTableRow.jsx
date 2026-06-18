import { Link } from "react-router-dom";
import "./ProductTableRow.css";

export const ProductTableRow = ({ product, onEditStock, onDelete }) => {
  return (
    <tr>
      <td>
        <img src={product.image} alt={product.title} className="table-img" />
      </td>
      <td>{product.title}</td>
      <td>
        <span
          className={`stock-badge ${
            product.stock <= 0 ? "no-stock" : "has-stock"
          }`}
        >
          {product.stock}
        </span>
      </td>
      <td>${product.price}</td>
      <td>
        <div className="action-buttons">
          <Link
            to={`/admin/products/edit/${product.id}`}
            className="btn-action edit"
            title="Editar"
          >
            <i className="fa-solid fa-pen"></i>
          </Link>
          <button
            onClick={() => onEditStock(product)}
            className="btn-action stock"
            title="Modificar Stock"
          >
            <i className="fa-solid fa-cubes"></i>
          </button>
          <button
            onClick={() => onDelete(product.id, product.title)}
            className="btn-action delete"
            title="Eliminar"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
