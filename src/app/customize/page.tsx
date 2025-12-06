"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 🌿 Plant Options
const plants = [
  
  { name: 'Spider Plant', image: '/images/customize/plants/Spider.jpg', price: 1 },
  { name: 'Peace Lily', image: '/images/customize/plants/Peace Lily.jpg', price: 400 },
  { name: 'Jade Plant', image: '/images/customize/plants/plant4.jpg', price: 50 },
  { name: 'Aloe Vera', image: '/images/customize/plants/Aloe Vera.jpg', price: 50 },
  { name: 'Ajwain', image: '/images/customize/plants/Ajwain.jpg', price: 50 },
  { name: 'Aralia', image: '/images/customize/plants/Aralia.jpg', price: 50 },
  { name: 'Begonia', image: '/images/customize/plants/Begonia.jpeg', price: 50 },
  { name: 'lakshmikamal', image: '/images/customize/plants/lakshmikamal.jpg', price: 300 },
  { name: 'Lucky Bamboo', image: '/images/customize/plants/lucky bamboo.jpg', price: 300 },
 
 
  { name: 'cuphea', image: '/images/customize/plants/cuphea.jpg', price: 50},
  
  { name: 'Nagdone', image: '/images/customize/plants/Nagdone.jpeg', price: 50 },
  { name: 'Ishnobush', image: '/images/customize/plants/snowbush.jpeg', price: 50 },
  
  { name: 'Jatropha', image: '/images/customize/plants/jatropha.webp', price: 50 },
  { name: 'coleus', image: '/images/customize/plants/coleus.jpg', price: 50},
 

  { name: 'Syngonium', image: '/images/customize/plants/syngoniumm.jpg', price: 80 },
 
];

// 🪴 Pots
const pots = [
  { name: 'Arty Pot1', image: '/images/pot1 (1).jpeg', price: 1 },
   { name: 'Arty Pot2', image: '/images/pot1 (2).jpeg', price: 61 },
   { name: 'Arty Pot3', image: '/images/pot1 (6).jpeg', price: 61 },
   { name: 'Arty Pot4', image: '/images/pot1 (8).jpeg', price: 61 },
   { name: 'Arty Pot5', image: '/images/pot1 (16).jpeg', price: 61 },  
   
   { name: 'Valencia Blue', image: '/images/pot1 (4).jpeg', price: 38}, 
   { name: 'Valencia Green', image: '/images/pot1 (5).jpeg', price: 38},
   
   { name: 'Valencia Brown', image: '/images/pot1 (9).jpeg', price: 38 }, 
       
       { name: 'Valencia Yellow', image: '/images/pot1 (11).jpeg', price: 38}, 
        { name: 'Valencia White', image: '/images/customize/pots/Valencia White.png', price: 49 }, 
         { name: 'Valencia Red', image: '/images/customize/pots/Valencia Red.png', price: 49 }, 
         { name: 'Valencia OffWhite', image: '/images/customize/pots/Valencia Offwhite.png', price: 49 }, 
         { name: 'Valencia OliveGreen', image: '/images/customize/pots/Valencia Olivegreen.png', price: 49 }, 
         { name: 'Valencia Mahroon ', image: '/images/customize/pots/Valencia Mahroon.png', price: 49 }, 
           
          
           { name: 'Valencia Pink', image: '/images/customize/pots/Valencia Pink.png', price: 49 }, 
           { name: 'Valencia Gray', image: '/images/customize/pots/Valencia Gray.png', price: 49 }, 
           
           
          
           { name: 'Ibiza Eco Yellow ', image: '/images/customize/pots/Ibiza Eco Yellow.jpeg', price: 44 }, 
            { name: 'Ibiza Eco Blue ', image: '/images/customize/pots/Ibiza Eco Blue.jpeg', price: 44 }, 
             { name: 'Ibiza Eco White ', image: '/images/customize/pots/Ibiza Eco White.jpeg', price: 44 }, 
              { name: 'Ibiza Eco Purple ', image: '/images/customize/pots/Ibiza Eco Purple.jpeg', price: 44 }, 
   { name: 'Ibiza Eco Maroon ', image: '/images/customize/pots/pot1 (7).jpeg', price: 44 },
       { name: 'Ibiza Eco Green', image: '/images/customize/pots/pot1 (12).jpeg', price: 44 }, 
       { name: 'Ibiza Eco Brown', image: '/images/customize/pots/pot1 (17).jpeg', price: 44 }, 
       
        { name: 'Million Pot', image: '/images/pot1 (14).jpeg', price: 40},
          
         { name: 'Tancy Pot1', image: '/images/customize/pots/tancy1.png', price: 49 }, 
         { name: 'Tancy Pot2', image: '/images/customize/pots/tancy2.png', price: 49 }, 
         { name: 'Tancy Pot3', image: '/images/customize/pots/tancy3.png', price: 49 }, 
         { name: 'Tancy Pot4', image: '/images/customize/pots/tancy4.png', price: 49 }, 
        
];

// 🎁 Packaging
const packaging = [
  { name: "Gift Bag1", image: "/images/customize/packging1.jpeg", price: 1 },
  { name: "Gift Bag2", image: "/images/customize/pack2.png", price: 50},
  { name: "Gift Bag3", image: "/images/customize/pack3.png", price: 50 },
];

// 💌 Cards
const cards = [
  { name: 'Birthday Card1', image: '/images/customize/card1.jpg', price:1 },
 
  { name: 'Birthday Card2', image: '/images/customize/card3.jpg', price: 20 },
  { name: 'Birthday Card3', image: '/images/customize/card4.jpg', price: 20 },
   { name: 'Anniversary Card', image: '/images/customize/card2.jpg', price: 20 },
  { name: 'Valentine Day Card1', image: '/images/customize/card5.jpg', price: 20 },
  { name: 'Valentine Day Card2', image: '/images/customize/card6.jpg', price: 20},
  { name: 'Thankyou Card1', image: '/images/customize/card7.jpg', price: 20 },
  { name: 'Thankyou Card2', image: '/images/customize/card8.jpg', price: 20},
  { name: 'Best Wishes Card', image: '/images/customize/card9.jpg', price: 20 },

];

// 🌱 Plant Care
const plantCare = [
  { name: "Vermi Compost", image: "/images/plantcare1.png", price: 50 },
  { name: "Cocopit", image: "/images/plantcare2.png", price: 50 },
];

// 🏡 Home Décor
const homeDecor = [
  { name: "Bird Nest Grass", image: "/images/decor1.png", price: 120 },
  { name: "Bird Home1", image: "/images/decor2.png", price: 250 },
  { name: "Bird Home2", image: "/images/decor3.png", price: 450 },
   { name: "Artificial ", image: "/images/decor4.png", price: 400 },
    { name: "Stones", image: "/images/decor5.png", price: 100 },
];

export default function CustomizePage() {
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [selectedPot, setSelectedPot] = useState<any>(null);
  const [selectedPackaging, setSelectedPackaging] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedPlantCare, setSelectedPlantCare] = useState<any>(null);
  const [selectedHomeDecor, setSelectedHomeDecor] = useState<any>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".custom-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  const total = [
    selectedPlant?.price || 0,
    selectedPot?.price || 0,
    selectedPackaging?.price || 0,
    selectedCard?.price || 0,
    selectedPlantCare?.price || 0,
    selectedHomeDecor?.price || 0,
  ].reduce((sum, val) => sum + val, 0);

  const handleCheckout = () => {
    const giftData = {
      plant: selectedPlant,
      pot: selectedPot,
      packaging: selectedPackaging,
      card: selectedCard,
      plantCare: selectedPlantCare,
      homeDecor: selectedHomeDecor,
      message,
      total,
    };
    localStorage.setItem("customGift", JSON.stringify(giftData));
    router.push("/checkout");
  };

  const Section = ({ title, items, selectedItem, setSelectedItem }: any) => (
    <div className="mb-10 custom-section">
      <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
        {title}
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-2 px-2">
        {items.map((item: any) => (
          <div
            key={item.name}
            onClick={() => setSelectedItem(item)}
            className={`min-w-[180px] p-3 cursor-pointer flex-shrink-0 rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 ${
              selectedItem?.name === item.name
                ? "border-green-600 bg-white/40"
                : "border-gray-300 bg-white/20 hover:bg-white/30"
            }`}
          >
            <Image
  src={item.image}
  alt={item.name}
  width={140}
  height={140}
 className="rounded-xl mb-2 object-contain w-full max-h-[170px] bg-white"
/>

            <p className="text-center text-base font-semibold text-green-900">
              {item.name}
            </p>
            <p className="text-center text-green-700 font-medium">
              ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#E1EEBC] min-h-screen w-full pt-28 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-10 text-center custom-section">
          Customize Your Plant Gift
        </h1>

        <Section title="Choose a Plant" items={plants} selectedItem={selectedPlant} setSelectedItem={setSelectedPlant} />
        <Section title="Choose a Pot" items={pots} selectedItem={selectedPot} setSelectedItem={setSelectedPot} />
        <Section title="Choose Packaging" items={packaging} selectedItem={selectedPackaging} setSelectedItem={setSelectedPackaging} />
        <Section title="Choose a Card" items={cards} selectedItem={selectedCard} setSelectedItem={setSelectedCard} />
        <Section title="Add Plant Care" items={plantCare} selectedItem={selectedPlantCare} setSelectedItem={setSelectedPlantCare} />
        <Section title="Add Home Décor" items={homeDecor} selectedItem={selectedHomeDecor} setSelectedItem={setSelectedHomeDecor} />

        {/* Message Input */}
        <div className="mb-10 custom-section">
          <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">Write Your Message</h2>
          <textarea
  rows={3}
  className="w-full border border-green-300 rounded p-2"
  placeholder="Your message here (optional, up to 30 words)"
  value={message}
  onChange={(e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.length <= 30) {
      setMessage(e.target.value);
    }
  }}
/>

<p className="text-sm text-green-700 mt-1 text-right">
  {message.trim() === "" ? 0 : message.trim().split(/\s+/).length}/30 words
</p>

        </div>

        {/* Summary */}
        <div className="bg-white/70 border border-green-200 rounded-xl p-6 shadow-md backdrop-blur-md custom-section">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Your Custom Gift Summary
          </h2>

          <ul className="text-green-900 space-y-1 text-center">
            {selectedPlant && <li><strong>Plant:</strong> {selectedPlant.name} (₹{selectedPlant.price})</li>}
            {selectedPot && <li><strong>Pot:</strong> {selectedPot.name} (₹{selectedPot.price})</li>}
            {selectedPackaging && <li><strong>Packaging:</strong> {selectedPackaging.name} (₹{selectedPackaging.price})</li>}
            {selectedCard && <li><strong>Card:</strong> {selectedCard.name} (₹{selectedCard.price})</li>}
            {selectedPlantCare && <li><strong>Plant Care:</strong> {selectedPlantCare.name} (₹{selectedPlantCare.price})</li>}
            {selectedHomeDecor && <li><strong>Home Décor:</strong> {selectedHomeDecor.name} (₹{selectedHomeDecor.price})</li>}
            <li><strong>Message:</strong> {message || "None"}</li>
          </ul>

          <button
            onClick={handleCheckout}
            disabled={total === 0}
            className="w-full mt-6 px-6 py-3 bg-green-700 text-white rounded shadow hover:bg-green-800 disabled:bg-gray-400"
          >
            {total === 0 ? "Select items to proceed" : `Add to Cart & Checkout (₹${total})`}
          </button>
        </div>
      </div>
    </div>
  );
}
