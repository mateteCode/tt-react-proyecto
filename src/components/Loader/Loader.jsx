import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      {/* Usamos el ícono fa-spinner o fa-circle-notch con la clase fa-spin */}
      <i className="fa-solid fa-spinner loader-icon"></i>
      {/*<p className="loader-text">Cargando...</p>*/}
    </div>
  );
};
