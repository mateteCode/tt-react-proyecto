import "./Footer.css";

export const Footer = () => {
  return (
    <footer>
      <p>Sitio desarrollado por Matías Lorenzo</p>
      <nav>
        <ul className="social-list">
          <li>
            <a href="https://wa.me/1150006000" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
