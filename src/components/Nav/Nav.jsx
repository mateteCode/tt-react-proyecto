import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const totalItems = getTotalItems();

  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"} title="Inicio">
            <i className="fa-solid fa-house"></i>
          </Link>
          {/*
            <Link to={"/genre/ficcion"} title="Inicio">
            <i className="fa-solid fa-house"></i>
          </Link>
             */}
        </li>

        {/* Zona Pública */}
        {!isAdminPath && (
          <li>
            <Link to={"/carrito"} title="Carrito" className="cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
              {totalItems > 0 && <span className="incart">{totalItems}</span>}
            </Link>
          </li>
        )}

        {/* Si el usuario está logueado */}
        {user && (
          <>
            {!isAdminPath && (
              <li>
                <Link to={"/admin/dashboard"} title="Ir al Panel">
                  <i className="fa-solid fa-gears"></i>
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={logout}
                title="Cerrar sesión"
                className="btn-logout"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
