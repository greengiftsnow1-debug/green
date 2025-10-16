'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const clients = [
  { name: 'Apollo Sage Group', logo: '/images/clients/client1.png' },
  { name: 'Sagar Group', logo: '/images/clients/client2.jpg' },
  { name: 'SMPL', logo: '/images/clients/client3.png' },
  { name: 'Vardhaman Group', logo: '/images/clients/client4.jpg' },
  { name: 'Client 5', logo: '/images/clients/agarwal power.png' },
  { name: 'Client 6', logo: '/images/clients/anant spelling mills.png' },
  { name: 'Client 6', logo: '/images/clients/l&t.png' },
  { name: 'Client 6', logo: '/images/clients/Lnct.png' },
  { name: 'Client 6', logo: '/images/clients/lupin.png' },
  { name: 'Client 6', logo: '/images/clients/p&g.png' },
  { name: 'Client 6', logo: '/images/clients/som.png' },
  { name: 'Client 6', logo: '/images/clients/sge.jpg' },
  { name: 'Client 6', logo: '/images/clients/tit.jpg' },
  { name: 'Client 6', logo: '/images/clients/jnct.png' },
  { name: 'Client 6', logo: '/images/clients/raja-bhoj-airport.webp' },
  { name: 'Client 6', logo: '/images/clients/ipca.jpg' },
  { name: 'Client 6', logo: '/images/clients/images (21).png' },
    { name: 'Client 6', logo: '/images/clients/heg.png' },
    { name: 'Client 6', logo: '/images/clients/green surfer.jpg' },
      { name: 'Client 6', logo: '/images/clients/eicher.png' },
      { name: 'Client 6', logo: '/images/clients/download.jpg' },
        { name: 'Client 6', logo: '/images/clients/dilip-buildcon.jpg' },
          { name: 'Client 6', logo: '/images/clients/daulatram.png' },  
  
];

export default function OurClients() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -50, // move left
        repeat: -1, // infinite
        duration: 20, // adjust speed
        ease: "linear",
      });
    }
  }, []);

  return (
    <section className="bg-[#E1EEBC] py-16 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
        Our Clients
      </h2>

      {/* Infinite slider */}
      <div className="overflow-hidden w-full">
        <div
          ref={sliderRef}
          className="flex gap-10 w-max"
          style={{ willChange: "transform" }}
        >
          {/* Duplicate clients list twice for smooth loop */}
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="w-40 h-28 relative flex-shrink-0 hover:scale-110 transition-transform duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* View All button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/clients"
          className="px-6 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 transition"
        >
          View All Clients
        </Link>
      </div>
    </section>
  );
}
