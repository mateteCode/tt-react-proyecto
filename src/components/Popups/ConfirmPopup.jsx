import "./Popups.css";

export const ConfirmPopup = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="popup-actions">
          <button className="btn outline btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn primary" onClick={onConfirm}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
