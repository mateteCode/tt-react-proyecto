import "./Item.css";

export const Item = ({ image, name, description, price, children }) => {
  return (
    <article className="card">
      <img src={image} alt={`foto de ${name}`} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Precio: {price}</p>
      {children}
    </article>
  );
};
