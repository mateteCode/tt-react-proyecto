import "./Item.css";

export const Item = ({ image, title, author, genre, price, children }) => {
  return (
    <article className="card">
      <div className="card-image">
        <img src={image} alt={`Portada de ${title}`} />
      </div>
      <div className="card-content">
        <span className="genre-tag">{genre}</span>
        <h2>{title}</h2>
        <p className="author">{author}</p>
        <div className="card-footer">
          <p className="price">${price.toLocaleString()}</p>
          {children}
        </div>
      </div>
    </article>
  );
};
