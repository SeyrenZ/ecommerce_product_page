"use client";
import { createContext, useContext, useState } from "react";
import { useMemo } from "react";
interface Product {
  name: string;
  image: string;
  price: number;
  totalprice: number;
  quantity: number;
}

interface CartContextData {
  cart: Product[];
  addToCart: (product: Product) => void;
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

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
