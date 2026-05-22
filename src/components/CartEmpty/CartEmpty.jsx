import { Link } from "react-router-dom";
import "./CartEmpty.css";

export const CartEmpty = () => {
  return (
    <div className="cart-empty-container">
      <i className="fa-solid fa-cart-shopping empty-icon"></i>
      <h2>Tu carrito está vacío</h2>
      <p>Parece que aún no agregaste ningún libro a tu colección.</p>
      <Link to="/" className="btn primary">
        Ver catálogo de libros
      </Link>
    </div>
  );
};
