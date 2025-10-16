'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function CartIcon() {
  const { cart } = useCart();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative bg-white p-3 rounded-full shadow-lg">
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        )}
      </div>
    </div>
  );
}
