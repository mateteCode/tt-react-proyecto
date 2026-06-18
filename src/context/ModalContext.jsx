import { createContext, useContext, useState } from "react";
import { AlertPopup } from "../components/Popups/AlertPopup";
import { ConfirmPopup } from "../components/Popups/ConfirmPopup";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null, // "alert" o "confirm"
    title: "",
    message: "",
    onConfirm: null,
  });

  const showAlert = (title, message, onConfirmCallback = null) => {
    setModal({
      isOpen: true,
      type: "alert",
      title,
      message,
      onConfirm: onConfirmCallback,
    });
  };

  const showConfirm = (title, message, onConfirmCallback) => {
    setModal({
      isOpen: true,
      type: "confirm",
      title,
      message,
      onConfirm: onConfirmCallback,
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      await modal.onConfirm();
    }
    closeModal();
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      <AlertPopup
        isOpen={modal.isOpen && modal.type === "alert"}
        title={modal.title}
        message={modal.message}
        onClose={handleConfirm}
      />

      <ConfirmPopup
        isOpen={modal.isOpen && modal.type === "confirm"}
        title={modal.title}
        message={modal.message}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </ModalContext.Provider>
  );
};
