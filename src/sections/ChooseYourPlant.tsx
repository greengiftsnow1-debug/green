'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabaseClient';

const plants = [
  { id: '1', name: 'Jade Plant', image: '/images/jade.jpg', price: 120 },
  { id: '2', name: 'Syngonium Plant', image: '/images/syngonium.jpg', price: 120 },
  { id: '3', name: 'Chlorophytum Comosum', image: '/images/chlorophytum.jpg', price: 120 },
  { id: '4', name: 'Golden Money Plant', image: '/images/moneyplant.jpg', price: 120 },
  { id: '5', name: 'Lucky Bamboo', image: '/images/luckybamboo.jpg', price: 120 },
  { id: '6', name: 'Erica Palm', image: '/images/ericapalm.jpg', price: 120 },
  { id: '7', name: 'Succulents', image: '/images/succulents.jpg', price: 120 },
  { id: '8', name: 'Aglaonema', image: '/images/aglaonema.jpg', price: 120 },
   { id: "1", name: "Ajwain", image: "/images/ajwain.jpg", price: 120 },
  { id: "2", name: "Aralia", image: "/images/arelia.jpg", price: 120 },
  { id: "3", name: "Begonia", image: "/images/bigonia.jpg", price: 120 },
  { id: "4", name: "Eclipta", image: "/images/eclipa.jpg", price: 120 },
  { id: "5", name: "Erison", image: "/images/erison.jpg", price: 120 },
  { id: "6", name: "Ficus", image: "/images/ficus.jpg", price: 120 },
  { id: "7", name: "Himalaya", image: "/images/himalaya.jpg", price: 120 },
  { id: "8", name: "Impatiens", image: "/images/impatiens.jpg", price: 120 },
  { id: "9", name: "Inrami", image: "/images/inrami.jpg", price: 120 },
  { id: "10", name: "Ishnobush", image: "/images/ishnobush.jpg", price: 120 },
  { id: "11", name: "Jade Plant", image: "/images/jade.jpg", price: 120 },
  { id: "12", name: "Jason", image: "/images/jason.jpg", price: 120 },
  { id: "13", name: "Jatropha", image: "/images/jetropa.jpg", price: 120 },
  { id: "14", name: "Khopia", image: "/images/khopia.jpg", price: 120 },
  { id: "15", name: "Lettuce", image: "/images/lettuce.jpg", price: 120 },
  { id: "16", name: "Merunta", image: "/images/merunta.jpg", price: 120 },
  { id: "17", name: "Mint", image: "/images/mint.jpg", price: 120 },
  { id: "18", name: "Nagdona Berigit", image: "/images/nagdona-berigit.jpg", price: 120 },
  { id: "19", name: "Nagdoni", image: "/images/ngdoni.jpg", price: 120 },
  { id: "20", name: "Nimonia", image: "/images/nimonia.jpg", price: 120 },
  { id: "21", name: "Opstime", image: "/images/opstime.jpg", price: 120 },
  { id: "22", name: "Pilambo", image: "/images/pilambo.jpg", price: 120 },
  { id: "23", name: "Piki", image: "/images/pilki.jpg", price: 120 },
  { id: "24", name: "Pindas", image: "/images/pindas.jpg", price: 120 },
  { id: "25", name: "Polish Red Leaf", image: "/images/polish-red-leaf.jpg", price: 120 },
  { id: "26", name: "Polish Berigit", image: "/images/polish-berigit.jpg", price: 120 },
  { id: "27", name: "Polish Green Leaf", image: "/images/polish-green-leaf.jpg", price: 120 },
  { id: "28", name: "Rasulia", image: "/images/rasulia.jpg", price: 120 },
  { id: "29", name: "Syngonium", image: "/images/syngonium.jpg", price: 120 },
  { id: "30", name: "Tikoma Bail", image: "/images/tikoma-bail.jpg", price: 120 },
  { id: "31", name: "Ujjainia Ficus", image: "/images/ujjainia-ficus.jpg", price: 120 }
];

const ChooseYourPlant = () => {
  const sectionRef = useRef(null);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );
  }, []);

  const handleBuyNow = async (plant: {
    id: string;
    name: string;
    image: string;
    price: number;
  }) => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      localStorage.setItem('buyNowPlant', JSON.stringify(plant));
      router.push('/login');
    } else {
      addToCart({ ...plant, quantity: 1 });
      router.push('/cart');
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-[#E1EEBC]">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#384D24]">
        Choose Your Plant
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-4 text-center"
          >
            <Image
              src={plant.image}
              alt={plant.name}
              width={300}
              height={300}
              className="rounded-xl object-cover w-full h-48"
            />
            <h3 className="text-xl font-semibold text-[#384D24] mt-4">
              {plant.name}
            </h3>
            <p className="text-[#384D24] font-bold mt-2">₹{plant.price}</p>
            <button
              onClick={() => handleBuyNow(plant)}
              className="mt-3 px-4 py-2 bg-[#90C67C] text-white rounded-full hover:bg-[#76b060] transition-colors"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* ✅ View All button */}
      <div className="text-center mt-10">
        <button
          onClick={() => router.push('/plants')}
          className="px-6 py-2 bg-[#384D24] text-white rounded-full hover:bg-[#2a371b] transition-colors"
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default ChooseYourPlant;
