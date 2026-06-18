import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import { Count } from "../Count/Count";
import { CartEmpty } from "../CartEmpty/CartEmpty";
import { useModal } from "../../context/ModalContext";

export const Cart = () => {
  const {
    cart,
    removeItem,
    clearCart,
    getCartTotal,
    updateQuantityInCart,
    checkout,
  } = useCart();

  const { showConfirm } = useModal();

  const handleClearCart = () => {
    showConfirm(
      "Vaciar carrito",
      "¿Estás seguro que deseas eliminar todos los libros de tu carrito?",
      clearCart,
    );
  };

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <section className="cart-container">
      <h1>Tu Carrito de Compras</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Portada</th>
            <th>Título</th>
            <th>Ejemplares</th>
            <th>Subtotal</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td data-label="Portada">
                <Link to={`/product/${item.id}`} className="cart-link">
                  <img src={item.image} alt={item.title} className="cart-img" />
                </Link>
              </td>
              <td data-label="Título">
                <Link to={`/product/${item.id}`} className="cart-link">
                  {item.title}
                </Link>
              </td>
              <td data-label="Ejemplares">
                <Count
                  initial={item.quantity}
                  max={item.stock}
                  onCountChange={(newVal) =>
                    updateQuantityInCart(item.id, newVal)
                  }
                />
              </td>
              <td data-label="Subtotal">${item.price * item.quantity}</td>
              <td data-label="Eliminar">
                <button
                  className="btn-remove"
                  onClick={() => removeItem(item.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-footer">
        <h3 className="cart-total">Total: ${getCartTotal()}</h3>

        <div className="cart-actions">
          <button className="btn-outline" onClick={handleClearCart}>
            Limpiar carrito
          </button>
          <button className="btn primary" onClick={checkout}>
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
};
