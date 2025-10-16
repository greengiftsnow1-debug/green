'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Plant } from '@/types/Plant';
import { CartItem } from '@/types/CartItem';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Plant) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  updateQuantity: (id: number | string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('greenGiftCart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('greenGiftCart', JSON.stringify(cart));
  }, [cart]);

  // Add or increase item in cart
  const addToCart = (plant: Plant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  // Update item quantity
  const updateQuantity = (id: number | string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('greenGiftCart');
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
