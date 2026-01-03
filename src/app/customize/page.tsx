"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type Item = {
  name: string;
  image: string;
  price: number;
};

type CartItem = Item & {
  qty: number;
  category: string;
};


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
  { name: "Gift Bag1", image: "/images/customize/packging1.png", price: 1 },
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


function SummaryItem({
  item,
  onUpdate,
  onRemove,
}: {
  item: CartItem;
  onUpdate: (name: string, qty: number) => void;
  onRemove: (name: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 bg-green-50 border rounded-xl p-3">
      <Image src={item.image} alt={item.name} width={60} height={60} />

      <div className="flex-1">
        <p className="font-semibold text-green-900">{item.name}</p>
        <p className="text-sm text-green-700">₹{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => onUpdate(item.name, item.qty - 1)} className="w-8 h-8 border">−</button>
        <span className="w-6 text-center">{item.qty}</span>
        <button onClick={() => onUpdate(item.name, item.qty + 1)} className="w-8 h-8 border">+</button>
      </div>

      <div className="font-semibold">₹{item.price * item.qty}</div>

      <button onClick={() => onRemove(item.name)} className="text-red-500">✕</button>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function CustomizePage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");

  /* GSAP */
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".custom-section").forEach((section) => {
      gsap.fromTo(section, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 });
    });
  }, []);

  /* ADD ITEM (ALL CATEGORIES) */
  const addItem = (item: Item, category: string) => {
    const existing = cart.find((i) => i.name === item.name);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1, category }]);
    }
  };

  /* TOTAL */
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  /* CHECKOUT */
  const handleCheckout = () => {
    localStorage.setItem(
      "customGift",
      JSON.stringify({ cart, message, total })
    );
    router.push("/checkout");
  };

  /* SECTION */
  const Section = ({
    title,
    items,
    category,
  }: {
    title: string;
    items: Item[];
    category: string;
  }) => (
    <div className="mb-10 custom-section">
      <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
        {title}
      </h2>
      <div className="flex gap-6 overflow-x-auto px-2">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => addItem(item, category)}
            className="min-w-[180px] p-3 cursor-pointer rounded-2xl border bg-white hover:border-green-600"
          >
            <Image src={item.image} alt={item.name} width={140} height={140} />
            <p className="text-center font-semibold">{item.name}</p>
            <p className="text-center">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#E1EEBC] min-h-screen pt-28 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10 custom-section">
          Customize Your Plant Gift
        </h1>

        <Section title="Plants" items={plants} category="plant" />
        <Section title="Pots" items={pots} category="pot" />
        <Section title="Packaging" items={packaging} category="packaging" />
        <Section title="Cards" items={cards} category="card" />
        

        {/* MESSAGE */}
        <div className="mb-10 custom-section">
          <textarea
            rows={3}
            className="w-full border rounded p-2"
            placeholder="Gift message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-2xl p-6 shadow custom-section">
          <h2 className="text-2xl font-bold text-center mb-6">
            🌿 Your Gift Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <SummaryItem
                key={item.name}
                item={item}
                onUpdate={(name, qty) =>
                  setCart(
                    qty <= 0
                      ? cart.filter((i) => i.name !== name)
                      : cart.map((i) =>
                          i.name === name ? { ...i, qty } : i
                        )
                  )
                }
                onRemove={(name) =>
                  setCart(cart.filter((i) => i.name !== name))
                }
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={total === 0}
            className="w-full mt-6 py-4 bg-green-700 text-white rounded-xl"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}