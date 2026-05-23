import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import { Count } from "../Count/Count";
import { CartEmpty } from "../CartEmpty/CartEmpty";

export const Cart = () => {
  const {
    cart,
    removeItem,
    clearCart,
    getCartTotal,
    updateQuantityInCart,
    checkout,
  } = useCart();

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
            <th>Precio</th>
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
                  onCountChange={(newVal) =>
                    updateQuantityInCart(item.id, newVal)
                  }
                />
              </td>
              <td data-label="Precio">${item.price * item.quantity}</td>
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
          <button className="btn-outline" onClick={clearCart}>
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
