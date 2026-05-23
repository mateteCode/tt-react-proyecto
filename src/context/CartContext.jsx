import { createContext, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

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

  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };

  const addItem = (item, quantity) => {
    if (isInCart(item)) {
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

  const checkout = () => {
    const confirmation = confirm("¿Desea finalizar la compra?");
    if (confirmation) {
      clearCart();
      alert("Compra finalizada");
      navigate("/");
      return;
    }
    alert("Compra cancelada");
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
