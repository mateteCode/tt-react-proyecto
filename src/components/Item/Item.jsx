import { getGenreLabel } from "../../utils/genres";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Item.css";

export const Item = ({
  image,
  title,
  author,
  genre,
  price,
  stock,
  createdAt,
  children,
}) => {
  const createdTimeMs = createdAt?.toMillis ? createdAt.toMillis() : createdAt;
  const isNew = createdTimeMs && Date.now() - createdTimeMs <= 604800000;
  const noStock = stock <= 0;
  const fewStock = stock > 0 && stock <= 3;

  return (
    <article className={`card ${noStock ? "out-of-stock" : ""}`}>
      <div className="card-image">
        <img src={image} alt={`Portada de ${title}`} />

        {/* Contenedor Izquierdo (Para el badge de Nuevo) */}
        {isNew && (
          <div className="badge-left">
            <span className="badge badge-new">Nuevo</span>
          </div>
        )}

        {/* Contenedor Derecho (Para los badges de Stock) */}
        <div className="badges-container">
          {noStock && <span className="badge badge-error">Sin Stock</span>}
          {fewStock && (
            <span className="badge badge-warning">Últimos disponibles</span>
          )}
        </div>
      </div>
      <div className="card-content">
        <span className="genre-tag">{getGenreLabel(genre)}</span>
        <h2>{title}</h2>
        <p className="author">{author}</p>
        <div className="card-footer">
          <p className="price">{formatCurrency(price)}</p>
          {children}
        </div>
      </div>
    </article>
  );
};
