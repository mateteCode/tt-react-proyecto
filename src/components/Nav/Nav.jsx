import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../../context/CartContext";
// import styles from "./Nav.module.css"

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"} title="Inicio">
            <i className="fa-solid fa-house"></i>
          </Link>
        </li>
        <li>
          <Link to={"/carrito"} title="Carrito" className="cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
