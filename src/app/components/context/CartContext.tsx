"use client";
import { createContext, useContext, useState } from "react";
import { useMemo } from "react";
interface Product {
  name: string;
  image: string[];
  price: number;
  totalprice: number;
  quantity: number;
  discount: number;
}

interface CartContextData {
  cart: Product[];
  addToCart: (product: Product) => void;
  remChart: (productIndex: number) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider"); // Added check to ensure useCart is used within CartProvider
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const remChart = (productIndex: number) => {
    setCart((currentCart) => [
      ...currentCart.slice(0, productIndex),
      ...currentCart.slice(productIndex + 1),
    ]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, remChart }}>
      {children}
    </CartContext.Provider>
  );
}
