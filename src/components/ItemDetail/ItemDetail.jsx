import { useCart } from "../../context/CartContext";
import { Count } from "../Count/Count";
import { getGenreLabel } from "../../utils/genres";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
  const { addItem, cart } = useCart();

  const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
  const availableStock = item.stock - (itemInCart?.quantity || 0);

  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="detail-info">
        <span className="genre-tag">{getGenreLabel(item.genre)}</span>
        <h1>{item.title}</h1>
        <h3>{item.author}</h3>

        {/* Info adicional */}
        <div className="meta-info">
          <p>
            <strong>Año:</strong> {item.year}
          </p>
          <p>
            <strong>Páginas:</strong> {item.pages} páginas
          </p>
          <p>
            <strong>Disponibles:</strong> {availableStock} ejemplar(es)
          </p>
        </div>

        <p className="full-description">{item.description}</p>
        <p className="price">${item.price.toLocaleString()}</p>

        <div
          className={`cart-notification-wrapper ${itemInCart ? "visible" : "hidden"}`}
        >
          <div className="cart-notification">
            <i className="fa-solid fa-circle-check"></i>
            Ya tenés {itemInCart?.quantity || 0} ejemplar(es) de este libro en
            tu carrito.
          </div>
        </div>

        <div className="detail-actions">
          {availableStock > 0 ? (
            <Count initial={1} max={availableStock}>
              {(count) => (
                <button
                  className="btn primary"
                  onClick={() => addItem(item, count)}
                >
                  Agregar {count} al carrito
                </button>
              )}
            </Count>
          ) : item.stock === 0 ? (
            // CASO 1: No hay stock en la base de datos
            <p
              style={{
                color: "#ef4444",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Este libro no tiene ejemplares disponibles por el momento.
            </p>
          ) : (
            // CASO 2: Hay stock, pero ya agregó todo al carrito
            <p
              style={{
                color: "#f59e0b",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Has alcanzado el límite de stock disponible para agregar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
