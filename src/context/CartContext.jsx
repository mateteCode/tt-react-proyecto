import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProductStock,
} from "../services/productsService";
import { useModal } from "./ModalContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { showAlert, showConfirm } = useModal();

  const addItem = async (item, quantity) => {
    const dbProduct = await getProductById(item.id);

    if (!dbProduct) {
      showAlert("Error", "El producto no existe.");
      return;
    }

    const existingItem = cart.find((i) => i.id === item.id);
    const existingQuantity = existingItem ? existingItem.quantity : 0;
    const totalDesired = existingQuantity + quantity;

    if (totalDesired > dbProduct.stock) {
      showAlert(
        "Stock insuficiente",
        `Solo quedan ${dbProduct.stock} unidades disponibles.`,
      );
      return;
    }

    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
    showAlert("¡Agregado!", "Producto agregado al carrito exitosamente.", () =>
      navigate("/"),
    );
    //navigate("/");
  };

  const removeItem = (id) => {
    showConfirm(
      "Quitar del carrito",
      "¿Seguro que deseas eliminar este libro de tu carrito?",
      () => {
        const updatedCart = cart.filter((element) => element.id !== id);
        setCart(updatedCart);
      },
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkout = async () => {
    showConfirm(
      "Finalizar Compra",
      "¿Estás seguro que deseas realizar la compra de estos libros?",
      async () => {
        try {
          for (const item of cart) {
            const dbProduct = await getProductById(item.id);
            const nuevoStock = dbProduct.stock - item.quantity;
            await updateProductStock(item.id, nuevoStock);
          }

          clearCart();
          showAlert("¡Éxito!", "¡Compra finalizada con éxito!", () =>
            navigate("/"),
          );
        } catch (error) {
          console.error("Error al procesar la compra", error);
          showAlert("Error", "Hubo un error procesando su compra.");
        }
      },
    );
  };

  const updateQuantityInCart = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const values = {
    clearCart,
    addItem,
    removeItem,
    getTotalItems,
    getCartTotal,
    cart,
    checkout,
    updateQuantityInCart,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
