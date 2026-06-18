import "./Popups.css";

export const AlertPopup = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="popup-actions">
          <button className="btn primary" onClick={onClose}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
