import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getProductById,
  updateProductStock,
} from "../services/productsService";

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

  /*
  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };
  */

  const addItem = async (item, quantity) => {
    const dbProduct = await getProductById(item.id);

    if (!dbProduct) {
      alert("El producto no existe.");
      return;
    }

    const existingItem = cart.find((i) => i.id === item.id);
    const existingQuantity = existingItem ? existingItem.quantity : 0;
    const totalDesired = existingQuantity + quantity;

    if (totalDesired > dbProduct.stock) {
      alert(
        `Stock insuficiente. Solo quedan ${dbProduct.stock} unidades disponibles.`,
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
    alert("Producto agregado al carrito");
    navigate("/");
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((element) => element.id !== id);
    setCart(updatedCart);
    alert("Producto eliminado del carrito");
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const checkout = async () => {
    const confirmation = confirm("¿Desea finalizar la compra?");
    if (confirmation) {
      try {
        for (const item of cart) {
          const dbProduct = await getProductById(item.id);
          const nuevoStock = dbProduct.stock - item.quantity;
          await updateProductStock(item.id, nuevoStock);
        }

        clearCart();
        alert("¡Compra finalizada con éxito!");
        navigate("/");
      } catch (error) {
        console.error("Error al procesar la compra", error);
        alert("Hubo un error procesando su compra.");
      }
    } else {
      alert("Compra cancelada");
    }
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
