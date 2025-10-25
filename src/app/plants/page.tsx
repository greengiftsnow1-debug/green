'use client';

import React, { useRef } from "react";
import { motion } from "framer-motion";

type Plant = {
  id: string;
  name: string;
  image: string;
  price: number;
};

const plants: Plant[] = [
  { id: "1", name: "Jade Plant", image: "/jade.png", price: 120 },
  { id: "2", name: "Lucky Bamboo", image: "/bamboo.png", price: 150 },
  { id: "3", name: "Aglaonema", image: "/aglaonema.png", price: 200 },
  { id: "4", name: "Succulent", image: "/succulent.png", price: 100 },
];

// ✅ Infinite Slider Component
function InfiniteSlider({
  addToCart,
}: {
  addToCart: (plant: Plant & { quantity: number }) => void;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sliderRef}
      className="overflow-hidden relative group py-10 bg-green-50"
    >
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...plants, ...plants].map((plant, index) => (
          <div
            key={index}
            className="min-w-[220px] bg-white shadow-lg rounded-2xl p-4 text-center hover:scale-105 transition-transform"
          >
            <img
              src={plant.image}
              alt={plant.name}
              className="h-32 mx-auto mb-3 object-contain"
            />
            <h3 className="text-lg font-semibold">{plant.name}</h3>
            <p className="text-green-600 font-bold">₹{plant.price}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart({ ...plant, quantity: 1 })}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ✅ Page Component (Wrapper)
export default function Page() {
  const addToCart = (plant: any) => {
    console.log("Added to cart:", plant);
    // You can later connect this with your useCart() logic
  };

  return <InfiniteSlider addToCart={addToCart} />;
}
