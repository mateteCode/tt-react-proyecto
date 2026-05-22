import { Link } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <i className="fa-solid fa-book-open logo-icon"></i>
          <span>Librería Online</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
