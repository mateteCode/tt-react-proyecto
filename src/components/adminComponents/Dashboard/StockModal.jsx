import { Count } from "../../Count/Count";
import "./StockModal.css";

export const StockModal = ({ product, onSave, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Actualizar Stock</h3>
        <p>{product.title}</p>
        <div className="stock-counter-wrapper">
          <Count initial={product.stock} min={0}>
            {(count) => (
              <button
                className="btn primary stock-save-btn"
                onClick={() => onSave(count)}
              >
                Guardar Stock: {count}
              </button>
            )}
          </Count>
        </div>
        <button className="btn outline btn-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
