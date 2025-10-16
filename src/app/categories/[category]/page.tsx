'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sample plant data per category
const plantData: Record<string, { name: string; price: number; image: string }[]> = {
  indoor: [
    { name: 'Areca Palm', price: 299, image: '/plants/indoor/areca.jpg' },
    { name: 'Peace Lily', price: 349, image: '/plants/indoor/lily.jpg' },
    { name: 'ZZ Plant', price: 289, image: '/plants/indoor/zz.jpg' },
    { name: 'Snake Plant', price: 279, image: '/plants/indoor/snake.jpg' },
    { name: 'Spider Plant', price: 199, image: '/plants/indoor/spider.jpg' },
    { name: 'Rubber Plant', price: 349, image: '/plants/indoor/rubber.jpg' },
    { name: 'Money Plant', price: 159, image: '/plants/indoor/money.jpg' },
    { name: 'Pothos', price: 189, image: '/plants/indoor/pothos.jpg' },
    
  ],
  succulents: [
    { name: 'Echeveria', price: 129, image: '/plants/succulents/echeveria.jpg' },
    { name: 'Aloe Vera', price: 149, image: '/plants/succulents/aloe.jpg' },
    { name: 'Haworthia', price: 169, image: '/plants/succulents/haworthia.jpg' },
    { name: 'Sedum', price: 139, image: '/plants/succulents/sedum.jpg' },
    { name: 'Jade Plant', price: 199, image: '/plants/succulents/jade.jpg' },
    { name: 'Panda Plant', price: 159, image: '/plants/succulents/panda.jpg' },
    { name: 'Cactus', price: 129, image: '/plants/succulents/cactus.jpg' },
    { name: 'Lithops', price: 179, image: '/plants/succulents/lithops.jpg' },
  ],
  bonsai: [
    { name: 'Ficus Bonsai', price: 799, image: '/plants/bonsai/ficus.jpg' },
    { name: 'Chinese Elm', price: 899, image: '/plants/bonsai/elm.jpg' },
    { name: 'Jade Bonsai', price: 699, image: '/plants/bonsai/jade.jpg' },
    { name: 'Boxwood Bonsai', price: 749, image: '/plants/bonsai/boxwood.jpg' },
    { name: 'Juniper Bonsai', price: 999, image: '/plants/bonsai/juniper.jpg' },
    { name: 'Maple Bonsai', price: 849, image: '/plants/bonsai/maple.jpg' },
    { name: 'Serissa Bonsai', price: 799, image: '/plants/bonsai/serissa.jpg' },
    { name: 'Olive Bonsai', price: 899, image: '/plants/bonsai/olive.jpg' },
  ],
'air-purifying': [
    { name: 'Areca Palm', price: 299, image: '/plants/air-purifying/areca.jpg' },
    { name: 'Boston Fern', price: 249, image: '/plants/air-purifying/boston.jpg' },
    { name: 'Spider Plant', price: 229, image: '/plants/air-purifying/spider.jpg' },
    { name: 'Rubber Plant', price: 349, image: '/plants/air-purifying/rubber.jpg' },
    { name: 'Peace Lily', price: 319, image: '/plants/air-purifying/lily.jpg' },
    { name: 'Aloe Vera', price: 199, image: '/plants/air-purifying/aloe.jpg' },
    { name: 'Money Plant', price: 159, image: '/plants/air-purifying/money.jpg' },
    { name: 'Snake Plant', price: 269, image: '/plants/air-purifying/snake.jpg' },
  ],
  'desk-plants': [
    { name: 'Mini Cactus', price: 99, image: '/plants/desk-plants/cactus.jpg' },
    { name: 'Lucky Bamboo', price: 149, image: '/plants/desk-plants/bamboo.jpg' },
    { name: 'Jade Plant', price: 129, image: '/plants/desk-plants/jade.jpg' },
    { name: 'Pothos', price: 139, image: '/plants/desk-plants/pothos.jpg' },
    { name: 'Succulent Mix', price: 169, image: '/plants/desk-plants/mix.jpg' },
    { name: 'Fittonia', price: 119, image: '/plants/desk-plants/fittonia.jpg' },
    { name: 'Mini Peace Lily', price: 149, image: '/plants/desk-plants/mini-lily.jpg' },
    { name: 'Air Plant', price: 159, image: '/plants/desk-plants/air.jpg' },
  ],
};

export default function CategoryPage() {
  const { category } = useParams();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

 const categoryKey = (category as string).toLowerCase();
const plants = plantData[categoryKey];


  if (!plants) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-600">
        Invalid category!
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#E1EEBC] px-6 py-24">
      <h2 className="text-4xl font-bold text-green-900 text-center mb-12 capitalize">
        {category} Plants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {plants.map((plant, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <Image
              src={plant.image}
              alt={plant.name}
              width={300}
              height={300}
              className="mx-auto object-contain rounded-xl"
            />
            <h3 className="text-lg font-semibold text-green-800 mt-4 text-center">{plant.name}</h3>
            <p className="text-green-700 text-center mt-1">₹{plant.price}</p>
            <button className="mt-3 w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
