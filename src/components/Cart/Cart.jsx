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
      <h1>Tu Biblioteca</h1>
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
              <td>
                <img src={item.image} alt={item.title} className="cart-img" />
              </td>
              <td>{item.title}</td>
              <td>
                <Count
                  initial={item.quantity}
                  onCountChange={(newVal) =>
                    updateQuantityInCart(item.id, newVal)
                  }
                />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="btn-remove"
                  onClick={() => removeItem(item.id)}
                  title="Eliminar libro"
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
