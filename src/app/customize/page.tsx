"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 🌿 Plant Options
const plants = [
  
  { name: 'Spider Plant', image: '/images/customize/Spider.jpg', price: 10 },
  { name: 'Peace Lily', image: '/images/customize/Peace Lily.jpg', price: 229 },
  { name: 'Jade Plant', image: '/images/customize/plant4.jpg', price: 189 },
  { name: 'Aloe Vera', image: '/images/customize/Aloe Vera.jpg', price: 159 },
  { name: 'Ajwain', image: '/images/customize/Ajwain.jpg', price: 159 },
  { name: 'Aralia', image: '/images/Arelia.jpg', price: 159 },
  { name: 'Begonia', image: '/images/Bigonia.jpg', price: 159 },
  { name: 'Eclipta', image: '/images/eclipa.jpg', price: 159 },
  { name: 'Erison', image: '/images/Erison.jpg', price: 159 },
  { name: 'Ficus', image: '/images/ficus.jpg', price: 159 },
  { name: 'Himalaya', image: '/images/himalaya.jpg', price: 159 },
  { name: 'Impatiens', image: '/images/customize/impatiens.jpg', price: 159 },
  { name: 'Inrami', image: '/images/inrami.jpg', price: 159 },
  { name: 'Ishnobush', image: '/images/customize/snowbush.jpeg', price: 159 },
  { name: 'Jason', image: '/images/Jason (2).jpg', price: 159 },
  { name: 'Jatropha', image: '/images/jetropa.jpg', price: 159 },
  { name: 'Khopia', image: '/images/khopia.jpg', price: 159 },
  { name: 'Mint', image: '/images/mint.jpg', price: 159 },
  { name: 'Nimonia', image: '/images/Nimonia.jpg', price: 159 },
  { name: 'Syngonium', image: '/images/customize/syngoniumm.jpg', price: 159 },
  { name: 'Ujjainia Ficus', image: '/images/Ujjainia Ficus.jpg', price: 159 }
];

// 🪴 Pots
const pots = [
  { name: 'Arty Pot', image: '/images/pot1 (1).jpeg', price: 11 },
  { name: 'Valencia', image: '/images/pot1 (3).jpeg', price: 38 },
  { name: 'Ibiza Eco Maroon', image: '/images/pot1 (7).jpeg', price: 44 },
  { name: 'Million Pot', image: '/images/pot1 (14).jpeg', price: 40 },
  { name: 'Tancy Pot', image: '/images/IMG_6497.jpg', price: 49 },
  { name: 'IMG_6337', image: '/images/IMG_6337.jpg', price: 80 }
];

// 🎁 Packaging
const packaging = [
  { name: "Gift Bag1", image: "/images/customize/packaging1.jpeg", price: 10 },
  { name: "Gift Bag2", image: "/images/customize/packaging2.jpg", price: 69 },
  { name: "Gift Bag3", image: "/images/customize/packging3.png", price: 69 },
];

// 💌 Cards
const cards = [
  { name: 'Birthday Card', image: '/images/customize/card1.jpg', price: 10 },
  { name: 'Thank You Card', image: '/images/customize/card2.jpg', price: 29 },
  { name: 'Congratulations Card', image: '/images/customize/card3.jpg', price: 29 },
  { name: 'Love Card', image: '/images/customize/card4.jpg', price: 29 },
  { name: 'Best Wishes Card', image: '/images/customize/card5.jpg', price: 29 },
  { name: 'Custom Message Card', image: '/images/customize/card6.jpg', price: 49 },
];

// 🌱 Plant Care
const plantCare = [
  { name: "Vermi Compost", image: "/images/plantcare1.png", price: 10 },
  { name: "Cocopit", image: "/images/plantcare2.png", price: 300 },
];

// 🏡 Home Décor
const homeDecor = [
  { name: "Mini Buddha Statue", image: "/images/decor1.jpg", price: 10 },
  { name: "Table Décor Piece", image: "/images/decor2.jpg", price: 450 },
  { name: "Table Décor Piece 2", image: "/images/decor3.jpg", price: 450 },
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
              width={160}
              height={160}
              className="rounded-xl mb-2 object-cover w-full h-36"
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
