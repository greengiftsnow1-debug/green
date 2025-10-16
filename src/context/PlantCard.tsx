'use client';

import { Plant } from '@/types/Plant';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types/CartItem';

type Props = {
  plant: Plant;
};

export default function PlantCard({ plant }: Props) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const item: CartItem = {
      ...plant,
      quantity: 1
    };
    addToCart(item);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
      <img
        src={plant.image}
        alt={plant.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{plant.name}</h3>
      <p className="text-green-700 font-bold mt-1">₹{plant.price}</p>
      <button
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
}
