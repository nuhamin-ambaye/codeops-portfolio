"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function Providers({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(dish) {
    setCart((current) => {
      const found = current.find((item) => item.id === dish.id);
      if (found) {
        return current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...dish, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
