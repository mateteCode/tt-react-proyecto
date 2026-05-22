import { useCart } from "../../context/CartContext";
import { Count } from "../Count/Count";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
  const { addItem, cart } = useCart();

  const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

  return (
    <div className="detail-container">
      <div className="detail-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="detail-info">
        <span className="genre-tag">{item.genre}</span>
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
          <Count initial={1}>
            {(count) => (
              <button
                className="btn primary"
                onClick={() => addItem(item, count)}
              >
                Agregar {count} al carrito
              </button>
            )}
          </Count>
        </div>
      </div>
    </div>
  );
};
