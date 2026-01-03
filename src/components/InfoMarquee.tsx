'use client';

import { Truck, Gift, Package } from 'lucide-react';

const items = [
  { icon: Truck, text: 'Quick & Reliable Delivery' },
  {icon: Truck , text:'Delivery Time Only: 9.00 AM To 7.00 PM' },
  { icon: Package, text: 'Premium Packaging' },
  { icon: Gift, text: 'Thoughtful & Memorable' },
];

export default function InfoMarquee() {
  return (
    <div className="w-full overflow-hidden bg-green-90 border-y border-green-200">
      <div className="relative flex">
        {/* Marquee track */}
        <div className="flex gap-12 animate-marquee whitespace-nowrap py-4">
          {[...items, ...items, ...items].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-green-800 font-medium text-sm md:text-base"
              >
                <Icon className="w-5 h-5 text-green-600" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
