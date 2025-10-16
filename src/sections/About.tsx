"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section className="bg-[#90C67C] px-8 py-20 text-white" id="about">
      <div ref={aboutRef} className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About Green Gift</h2>
        <p className="text-lg leading-relaxed">
          At <strong>Green Gift</strong>, we believe that gifting plants is a way to spread love,
          freshness, and sustainability. Our curated collection brings together vibrant greenery
          and heartfelt packaging to make your gift truly memorable.
        </p>
      </div>
    </section>
  );
};

export default About;
