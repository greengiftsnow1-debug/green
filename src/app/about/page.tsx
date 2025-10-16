'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const aboutRef = useRef(null);
  const awardsRef = useRef(null);
  const pressRef = useRef(null);

  useEffect(() => {
    const fadeIn = (el: any) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          }
        );
      }
    };

    fadeIn(aboutRef.current);
    fadeIn(awardsRef.current);
    fadeIn(pressRef.current);
  }, []);

  return (
    <section className="bg-[#E1EEBC] pt-28 pb-10">
        {/* About Us Heading */}
  <h1 className="text-5xl font-bold text-green-900 text-center mb-12">About Us</h1>  
      {/* About Section */}

      <div ref={aboutRef} className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
        
          <Image
            src="/images/about-journey.png"
            alt="Green Journey"
            width={600}
            height={400}
            className="rounded-2xl shadow-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-green-900 mb-4">Our Green Journey</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Welcome to Greengiftnow, where we believe the most beautiful gifts are living ones. We started with a simple idea: to change the way people think about gifting. In a world of fleeting trends and disposable items, we wanted to offer something with lasting value—something that grows, thrives, and brings joy long after the wrapping paper is gone.

Our Mission

Our mission is to replace ordinary presents with extraordinary plants. We want to help you celebrate every occasion, from birthdays and anniversaries to new homes and new beginnings, with a gift that symbolizes life, growth, and connection. Each plant we offer is more than just a gift; it's a living reminder of a special moment and a commitment to a greener planet.

Gifts that Grow

At Greengiftnow, you'll find a curated selection of beautiful plants perfect for any event. Whether it's a vibrant succulent for a friend's desk, a lush fern to congratulate a loved one, or a flowering plant to say "thank you," our green gifts are chosen with care. Join us in cultivating a new tradition of thoughtful, sustainable gifting—one plant at a time.
          </p>
        </div>
      </div>

      
        
      

      {/* Footer */}
      <Footer />
    </section>
  );
}
