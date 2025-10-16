'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const stats = [
  { label: 'Orders Delivered', target: 84 },
  { label: 'Happy Customers', target: 92 },
  { label: 'Plants Available', target: 75 },
  
];

export default function Stats() {
  const countersRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    countersRef.current.forEach((counter, i) => {
      if (counter) {
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: stats[i].target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out',
            onUpdate: () => {
              counter.innerText = `${Math.ceil(parseFloat(counter.innerText || '0'))}`;
            },
          }
        );
      }
    });
  }, []);

  // ✅ Create ref setter function to avoid TS conflict
  const setCounterRef = (el: HTMLSpanElement | null, index: number) => {
    countersRef.current[index] = el;
  };

  return (
    <section className="py-16 bg-[#E1EEBC] text-green-900">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={stat.label} className="text-4xl font-bold">
            <span
              ref={(el) => setCounterRef(el, index)} // ✅ Safe callback ref
              className="block"
            >
              0
            </span>
            <span className="text-sm font-medium mt-2 block">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
