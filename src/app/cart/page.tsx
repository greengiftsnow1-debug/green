'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <section className="pt-32 px-6 pb-20 bg-[#E1EEBC] min-h-screen">
      <h1 className="text-3xl font-bold text-green-900 mb-10 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty 🪴</p>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-8 bg-white/40 backdrop-blur-md p-6 rounded-xl shadow"
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={400}
                  className="rounded-xl object-cover w-full h-[300px]"
                />
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-green-900">{item.name}</h2>
                  <p className="text-lg text-gray-800 mt-2">₹{item.price} per item</p>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="font-semibold">Quantity:</span>
                    <button
                      className="bg-green-300 text-green-900 px-3 py-1 rounded"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="bg-green-300 text-green-900 px-3 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="text-right mt-4">
            <p className="text-xl font-bold text-green-900 mb-2">Total: ₹{total}</p>
            <button
              className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
