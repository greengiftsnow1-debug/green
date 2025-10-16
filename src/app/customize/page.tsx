"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const plants = [
  { name: 'Areca Palm', image: '/images/customize/plant1.jpg', price: 299 }, { name: 'Snake Plant', image: '/images/customize/plant2.jpg', price: 249 }, { name: 'Peace Lily', image: '/images/customize/plant3.jpg', price: 229 }, { name: 'Jade Plant', image: '/images/customize/plant4.jpg', price: 189 }, { name: 'Spider Plant', image: '/images/customize/plant5.jpg', price: 209 }, { name: 'Aloe Vera', image: '/images/customize/plant6.jpg', price: 159 }, { name: 'Ajwain', image: '/images/Ajwain.jpg', price: 159 }, { name: 'Aralia', image: '/images/Arelia.jpg', price: 159 }, { name: 'Begonia', image: '/images/Bigonia.jpg', price: 159 }, { name: 'Eclipta', image: '/images/eclipa.jpg', price: 159 }, { name: 'Erison', image: '/images/Erison.jpg', price: 159 }, { name: 'Ficus', image: '/images/ficus.jpg', price: 159 }, { name: 'Himalaya', image: '/images/himalaya.jpg', price: 159 }, { name: 'Impatiens', image: '/images/impatiens.jpg', price: 159 }, { name: 'Inrami', image: '/images/inrami.jpg', price: 159 }, { name: 'Ishnobush', image: '/images/ishnobush.jpg', price: 159 }, { name: 'Jade Plant', image: '/images/jade.jpg', price: 159 }, { name: 'Jason', image: '/images/Jason (2).jpg', price: 159 }, { name: 'Jatropha', image: '/images/jetropa.jpg', price: 159 }, { name: 'Khopia', image: '/images/khopia.jpg', price: 159 }, { name: 'Lettuce', image: '/images/lettuce.jpg', price: 159 }, { name: 'Merunta', image: '/images/merunta.jpg', price: 159 }, { name: 'Mint', image: '/images/mint.jpg', price: 159 }, { name: 'Nagdona Berigit', image: '/images/Nagdona Berigit.jpg', price: 159 }, { name: 'Nagdoni', image: '/images/Ngdoni.jpg', price: 159 }, { name: 'Nimonia', image: '/images/Nimonia.jpg', price: 159 }, { name: 'Opstime', image: '/images/Opistime.jpg', price: 159 }, { name: 'Pilambo', image: '/images/Pilambo.jpg', price: 159 }, { name: 'Piki', image: '/images/Pilki.jpg', price: 159 }, { name: 'Pindas', image: '/images/pindas.jpg', price: 159 }, { name: 'Polish Red Leaf', image: '/images/Poliesh Red Leaf.jpg', price: 159 }, { name: 'Polish Berigit', image: '/images/polish berigit.jpg', price: 159 }, { name: 'Polish Green Leaf', image: '/images/polish green leef.jpg', price: 159 }, { name: 'Rasulia', image: '/images/rasulia.jpg', price: 159 }, { name: 'Syngonium', image: '/images/syngonium.jpg', price: 159 }, { name: 'Tikoma Bail', image: '/images/Tikoma.jpg', price: 159 }, { name: 'Ujjainia Ficus', image: '/images/Ujjainia Ficus.jpg', price: 159 }
]
const pots = [
  { name: 'Arty Pot', image: '/images/pot1 (1).jpeg', price: 61 },
   { name: 'Arty Pot', image: '/images/pot1 (2).jpeg', price: 61 },
   { name: 'Arty Pot', image: '/images/pot1 (6).jpeg', price: 61 },
   { name: 'Arty Pot', image: '/images/pot1 (8).jpeg', price: 61 },
   { name: 'Arty Pot', image: '/images/pot1 (16).jpeg', price: 61 },  
   { name: 'Valencia', image: '/images/pot1 (3).jpeg', price:  38}, 
   { name: 'Valencia', image: '/images/pot1 (4).jpeg', price: 38}, 
   { name: 'Valencia', image: '/images/pot1 (5).jpeg', price: 38},
   { name: 'Valencia', image: '/images/pot1 (13).jpeg', price: 38 },
   { name: 'Valencia', image: '/images/pot1 (9).jpeg', price: 38 }, 
       { name: 'Valencia', image: '/images/pot1 (10).jpeg', price: 38}, 
       { name: 'Valencia', image: '/images/pot1 (11).jpeg', price: 38}, 
   { name: 'Ibiza Eco Maroon ', image: '/images/pot1 (7).jpeg', price: 44 },
       { name: 'Ibiza Eco Green', image: '/images/pot1 (12).jpeg', price: 44 }, 
       { name: 'Ibiza Eco Brown', image: '/images/pot1 (17).jpeg', price: 44 }, 
       
        { name: 'Million Pot', image: '/images/pot1 (14).jpeg', price: 40},
          
         
         
         { name: 'IMG_6512', image: '/images/IMG_6512.jpg', price: 49 }, 
         { name: 'IMG_6502', image: '/images/IMG_6502.jpg', price: 49 }, 
         { name: 'Tancy Pot', image: '/images/IMG_6497.jpg', price: 49 }, 
         { name: 'IMG_6492', image: '/images/IMG_6492.jpg', price: 85 }, 
         { name: 'IMG_6490', image: '/images/IMG_6490.jpg', price: 49 }, 
         { name: 'IMG_6487', image: '/images/IMG_6487.jpg', price: 49 }, 
         { name: 'IMG_6481', image: '/images/IMG_6481.jpg', price: 49 }, 
         { name: 'IMG_6478', image: '/images/IMG_6478.jpg', price: 49 }, 
         { name: 'IMG_6471', image: '/images/IMG_6471.jpg', price: 49 }, 
         { name: 'IMG_6467', image: '/images/IMG_6467.jpg', price: 49 }, 
         { name: 'IMG_6462', image: '/images/IMG_6462.jpg', price: 49 }, 
         { name: 'IMG_6457', image: '/images/IMG_6457.jpg', price: 49 }, 
         { name: 'IMG_6450', image: '/images/IMG_6450.jpg', price: 49 },
          { name: 'IMG_6445', image: '/images/IMG_6445.jpg', price: 49 },
           { name: 'IMG_6440', image: '/images/IMG_6440.jpg', price: 49 }, 
           { name: 'IMG_6431', image: '/images/IMG_6431.jpg', price: 49 }, 
           { name: 'IMG_6420', image: '/images/IMG_6420.jpg', price: 49 }, 
           { name: 'IMG_6416', image: '/images/IMG_6416.jpg', price: 49 }, 
           { name: 'IMG_6415', image: '/images/IMG_6415.jpg', price: 49 }, 
           { name: 'IMG_6410', image: '/images/IMG_6410.jpg', price: 38 }, 
           { name: 'IMG_6399', image: '/images/IMG_6399.jpg', price: 38 }, 
           { name: 'IMG_6347', image: '/images/IMG_6347.jpg', price: 38 },
            { name: 'IMG_6337', image: '/images/IMG_6337.jpg', price: 80 }
];

const packaging = [
  { name: "Eco Wrap", image: "/images/customize/packaging1.jpeg", price: 49 },
  { name: "Gift Bag", image: "/images/customize/packaging2.jpg", price: 69 },
];

const cards = [
  { name: 'Birthday Card', image: '/images/customize/card1.jpg', price: 29 }, { name: 'Thank You Card', image: '/images/customize/card2.jpg', price: 29 }, { name: 'Congratulations Card', image: '/images/customize/card3.jpg', price: 29 }, { name: 'Love Card', image: '/images/customize/card4.jpg', price: 29 }, { name: 'Best Wishes Card', image: '/images/customize/card5.jpg', price: 29 }, { name: 'Custom Message Card', image: '/images/customize/card6.jpg', price: 49 },
];

// 🌱 New Section: Plant Care
const plantCare = [
  { name: "Vermi Compost", image: "/images/plantcare1.png", price: 300 },
  { name: "cocopit", image: "/images/plantcare2.png", price: 300 },
];

// 🏡 New Section: Home Décor
const homeDecor = [
  { name: "Mini Buddha Statue", image: "/images/decor1.jpg", price: 450 },
  { name: "Table Décor Piece", image: "/images/decor2.jpg", price: 450 },
  { name: "Table Décor Piece", image: "/images/decor3.jpg", price: 450 },
  { name: "Table Décor Piece", image: "/images/decor4.jpg", price: 450 },
  { name: "Table Décor Piece", image: "/images/decor5.jpg", price: 450 },
];

export default function CustomizePage() {
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const [selectedPot, setSelectedPot] = useState(pots[0]);
  const [selectedPackaging, setSelectedPackaging] = useState(packaging[0]);
  const [selectedCard, setSelectedCard] = useState(cards[0]);

  // ✨ New states
  const [selectedPlantCare, setSelectedPlantCare] = useState(plantCare[0]);
  const [selectedHomeDecor, setSelectedHomeDecor] = useState(homeDecor[0]);

  const [message, setMessage] = useState("");
  const router = useRouter();

  const total =
    selectedPlant.price +
    selectedPot.price +
    selectedPackaging.price +
    selectedCard.price +
    selectedPlantCare.price +
    selectedHomeDecor.price;

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
              selectedItem.name === item.name
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

        <Section
          title="Choose a Plant"
          items={plants}
          selectedItem={selectedPlant}
          setSelectedItem={setSelectedPlant}
        />
        <Section
          title="Choose a Pot"
          items={pots}
          selectedItem={selectedPot}
          setSelectedItem={setSelectedPot}
        />
        <Section
          title="Choose Packaging"
          items={packaging}
          selectedItem={selectedPackaging}
          setSelectedItem={setSelectedPackaging}
        />
        <Section
          title="Choose a Card"
          items={cards}
          selectedItem={selectedCard}
          setSelectedItem={setSelectedCard}
        />

        {/* 🌱 New Section */}
        <Section
          title="Add Plant Care"
          items={plantCare}
          selectedItem={selectedPlantCare}
          setSelectedItem={setSelectedPlantCare}
        />

        {/* 🏡 New Section */}
        <Section
          title="Add Home Décor"
          items={homeDecor}
          selectedItem={selectedHomeDecor}
          setSelectedItem={setSelectedHomeDecor}
        />

        <div className="mb-10 custom-section">
          <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">
            Write Your Message
          </h2>
          <textarea
            rows={3}
            className="w-full border border-green-300 rounded p-2"
            placeholder="Your message here (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="bg-white/70 border border-green-200 rounded-xl p-6 shadow-md backdrop-blur-md custom-section">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Your Custom Gift Summary
          </h2>
          <ul className="text-green-900 space-y-1 text-center">
            <li>
              <strong>Plant:</strong> {selectedPlant.name} (₹
              {selectedPlant.price})
            </li>
            <li>
              <strong>Pot:</strong> {selectedPot.name} (₹{selectedPot.price})
            </li>
            <li>
              <strong>Packaging:</strong> {selectedPackaging.name} (₹
              {selectedPackaging.price})
            </li>
            <li>
              <strong>Card:</strong> {selectedCard.name} (₹{selectedCard.price})
            </li>
            <li>
              <strong>Plant Care:</strong> {selectedPlantCare.name} (₹
              {selectedPlantCare.price})
            </li>
            <li>
              <strong>Home Décor:</strong> {selectedHomeDecor.name} (₹
              {selectedHomeDecor.price})
            </li>
            <li>
              <strong>Message:</strong> {message || "None"}
            </li>
          </ul>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 px-6 py-3 bg-green-700 text-white rounded shadow hover:bg-green-800"
          >
            Add to Cart & Checkout (₹{total})
          </button>
        </div>
      </div>
    </div>
  );
}
