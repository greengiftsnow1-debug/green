'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: 'Indoor', slug: 'indoor', image: '/plants/indoor.jpg' },
  { name: 'Succulents', slug: 'succulents', image: '/plants/succulents.jpg' },
  { name: 'Air Purifying', slug: 'air-purifying', image: '/plants/air.jpg' },
  { name: 'Bonsai', slug: 'bonsai', image: '/plants/bonsai.jpg' },
  { name: 'Desk Plants', slug: 'desk-plants', image: '/plants/desk.jpg' },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Animate cards
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen px-8 py-20 bg-[#E1EEBC]"
      id="categories"
    >
      <h2
        ref={headingRef}
        className="text-4xl font-bold text-center text-green-900 mb-12"
      >
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
       {categories.map((cat, i) => (
  <Link key={cat.slug} href={`/categories/${cat.slug}`}>
    <div
      ref={(el) => {
        cardsRef.current[i] = el;
      }}
      className="cursor-pointer bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
    >
      <Image
        src={cat.image}
        alt={cat.name}
        width={400}
        height={300}
        className="rounded-xl h-48 w-full object-cover mb-4"
      />
      <h3 className="text-2xl font-semibold text-green-800 text-center">
        {cat.name}
      </h3>
    </div>
  </Link>
))}

      </div>
    </section>
  );
}
