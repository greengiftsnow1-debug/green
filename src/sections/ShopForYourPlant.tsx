"use client";
import React from "react";
import Image from "next/image";
import useCart from "@/app/hooks/useCart"; // 👈 import your cart hook

const products = [
  {
    id: "fertilizer-1",
    name: "Organic Fertilizer",
    image: "/images/fertilizer1.png",
    price: 99,
  },
  {
    id: "plant-food-1",
    name: "Plant Food Mix",
    image: "/images/plantfood1.png",
    price: 149,
  },
];

export default function ShopForYourPlant() {
  const { addToCart } = useCart(); // 👈 now you can use addToCart

  return (
    <section className="py-16 bg-green-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Shop For Your Plant
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-4 text-center hover:shadow-xl transition"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
            <p className="text-green-600 font-bold mt-2">₹{item.price}</p>
            <button
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  image: item.image,
                  price: item.price,
                  quantity: 1, // 👈 always pass quantity
                })
              }
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
